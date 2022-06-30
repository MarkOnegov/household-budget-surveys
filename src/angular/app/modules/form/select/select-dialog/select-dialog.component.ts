import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectFieldOptions } from 'src/common/decorators/form.decorators';
import { FormBase } from '../../form.base';
import { FieldAdd } from '../../form.component';
import { SelectService } from '../select.service';

export type SelectDialogData = SelectFieldOptions &
  FieldAdd & {
    value: string;
  };

@Component({
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss'],
})
export class SelectDialogComponent extends FormBase {
  items: unknown[] = [];
  nextId?: string = undefined;
  loading = false;
  loaded = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public field: SelectDialogData,
    private selectService: SelectService,
  ) {
    super();
    this.getNext();
  }

  getNext() {
    if (this.loading || (this.loaded && !this.nextId)) {
      return;
    }
    this.loading = true;
    this.selectService
      .getItems(this.field.url, { nextId: this.nextId || '' })
      .subscribe((data) => {
        this.nextId = data.pagination.nextId;
        this.items.push(...data.data);
        this.loaded = true;
        this.loading = false;
      });
  }

  scroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 50) {
      this.getNext();
    }
  }
}
