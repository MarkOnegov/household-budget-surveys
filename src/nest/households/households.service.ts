import { NanoService } from '@monegov/nano';
import { Injectable } from '@nestjs/common';
import { DocumentViewParams } from 'nano';
import {
  FormFields,
  FormInfo,
  FormOptions,
  getForms,
} from 'src/common/decorators/form.decorators';
import {
  FormProgress,
  Household,
  HouseholdProgress,
} from 'src/common/types/household.types';
import { PageQuery, Paginated } from 'src/common/types/pagination.types';

@Injectable()
export class HouseholdsService {
  constructor(private nanoService: NanoService) {}

  async find(query: PageQuery, interviewer: string) {
    if (!query.length) {
      query.length = 10;
    }
    if (!query.page) {
      query.page = 0;
    }
    const viewParams: DocumentViewParams = { limit: query.length + 1 };
    if (interviewer) {
      viewParams.start_key = interviewer;
      viewParams.end_key = interviewer;
      viewParams.skip = query.page * query.length;
    } else {
      if (query.nextId) {
        viewParams.startkey = query.nextId;
      } else {
        viewParams.skip = query.page * query.length;
      }
    }

    const { total_rows, rows } =
      await this.nanoService.documentScope.view<Household>(
        'households',
        interviewer ? 'interviewer' : 'households',
        viewParams,
      );
    return this.getPage(
      rows.map((r) => r.value).slice(0, query.length),
      rows[query.length]?.key,
      query.page,
      total_rows,
      query.length,
    );
  }

  async getFormValues(householdId: string, form: string) {
    const household = await this.getHousehold(householdId);
    if (!household) {
      return undefined;
    }
    const fields = getForms()[form]?.fields;
    if (!fields) {
      return undefined;
    }
    const values: { [field: string]: unknown } = {};
    for (const fieldName in fields) {
      if (
        Object.prototype.hasOwnProperty.call(fields, fieldName) &&
        Object.prototype.hasOwnProperty.call(household, fieldName)
      ) {
        values[fieldName] = (household as any)[fieldName];
      }
    }
    return values;
  }

  async export(id: string) {
    return this.getHousehold(id);
  }

  async create(household: Household) {
    return this.nanoService.documentScope.insert({
      ...household,
      type: 'household',
    });
  }

  async update(id: string, update: Partial<Household>) {
    const household = await this.getHousehold(id);
    if (!household) {
      return undefined;
    }
    Object.entries(update).forEach(
      ([name, value]) => ((household as any)[name] = value),
    );
    const res = await this.nanoService.documentScope.insert({
      ...household,
      type: 'household',
    });
    return res.ok ? household : undefined;
  }

  async getProgress(id: string): Promise<HouseholdProgress | undefined> {
    const household = await this.getHousehold(id);
    if (!household) {
      return undefined;
    }
    const forms: FormProgress[] = Object.entries(getForms())
      .map(([name, form]) => ({ form: name, ...form }))
      .filter(({ progress }) => !!progress)
      .sort((a, b) => {
        if (!a.index && !b.index) {
          return 0;
        }
        if (!a.index) {
          return -1;
        }
        if (!b.index) {
          return 1;
        }
        return a.index - b.index;
      })
      .map((form) => this.getProgressForm(household, form));
    let disable = false;
    forms.forEach((form) => {
      if (disable) {
        form.progress = -1;
      } else {
        if (form.progress === 100) {
          form.done = true;
        } else {
          disable = true;
        }
      }
    });
    return {
      forms,
      _id: household._id,
      description: household.description,
      locality: household.locality,
      territory: household.territory,
    };
  }

  private async getHousehold(id: string) {
    const household = (
      await this.nanoService.documentScope.view<Household>(
        'households',
        'households',
        { start_key: id, limit: 1 },
      )
    ).rows.find(() => true)?.value;

    return household || undefined;
  }

  private getProgressForm(
    household: Household,
    form: FormOptions & FormInfo,
  ): FormProgress {
    return {
      done: false,
      name: form.form,
      progress: this.getProgressFields(household, form.fields),
    };
  }

  private getProgressFields(household: Household, fields: FormFields): number {
    const fieldNames = Object.entries(fields)
      .filter(([name, field]) => field.type !== 'create-array')
      .map(([name]) => name);
    const total = fieldNames.length;
    const filled = fieldNames
      .map((name) => (household as any)[name])
      .filter(Boolean).length;
    return (filled * 100) / total;
  }

  private getPage<T>(
    data: T[],
    nextId: string,
    page: number,
    total: number,
    length: number,
    desc?: boolean,
  ): Paginated<T> {
    return {
      data: desc ? data.reverse() : data,
      pagination: { nextId, page, total, length },
    };
  }
}
