import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CommonFieldOptions,
  EnumFieldOptions,
  FormField,
  FormInfo,
  SelectFieldOptions,
  TextFieldOptions,
} from 'src/common/decorators/form.decorators';
import { FormService } from '../../services/form.service';
import { FormBase } from './form.base';

export type FieldAdd = CommonFieldOptions & {
  name: string;
  control: AbstractControl;
};

type ComponentFormField = FormField & FieldAdd;

@Component({
  selector: 'hbs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends FormBase implements OnInit {
  @Input('formName')
  set _formName(name: string) {
    this.formName = name;
    const form = window.forms[name];
    if (!form) {
      throw new Error(`form "${name}" not found`);
    }
    this.form = form;
    this.formFields = Object.entries(form.fields).map(
      ([name, field]) =>
        ({ ...field, name, control: new FormControl() } as ComponentFormField),
    );
    this.formFields
      .filter(({ required }) => !!required)
      .forEach(({ control }) => control.addValidators(Validators.required));
    this.formFields
      .filter(({ readonly }) => !!readonly)
      .forEach(({ control }) => control.disable());
    this.formGroup = new FormGroup(
      Object.fromEntries(
        this.formFields.map(({ control, name }) => [name, control]),
      ),
    );
    (window as any).formGroup = this.formGroup;
  }
  @Input()
  urlValues?: { [name: string]: string };
  formName!: string;
  formGroup: FormGroup = new FormGroup({});
  formFields: ComponentFormField[] = [];
  form!: FormInfo;
  isUpdate = false;

  constructor(private route: ActivatedRoute, private formService: FormService) {
    super();
  }
  ngOnInit(): void {
    if (this.urlValues) {
      this.loadValues(this.urlValues);
    } else {
      this.route.params.subscribe((params) => this.loadValues(params));
    }
  }

  getEnumField(field: ComponentFormField) {
    return field as EnumFieldOptions & FieldAdd;
  }

  getSelectField(field: ComponentFormField) {
    return field as SelectFieldOptions & FieldAdd;
  }

  getTextField(field: CommonFieldOptions) {
    return field as TextFieldOptions & FieldAdd;
  }

  log<T>(data: T): T {
    console.log(data);
    return data;
  }

  submit() {
    if (this.isUpdate) {
      const url = this.getUrl(
        this.form.updateUrl,
        this.urlValues || this.route.snapshot.params,
      );
      if (!url) {
        return;
      }
      this.formService.update(url, this.formGroup.value).subscribe(console.log);
    } else {
      const url = this.getUrl(
        this.form.createUrl,
        this.urlValues || this.route.snapshot.params,
      );
      if (!url) {
        return;
      }
      this.formService.create(url, this.formGroup.value).subscribe(console.log);
    }
  }

  private loadValues(urlValues: { [name: string]: string }) {
    const url = this.getUrl(this.form.valueUrl, urlValues);
    console.log(() => this.formGroup);
    if (!url) {
      return;
    }
    this.isUpdate = true;
    this.formService
      .getFormValues(url + '/' + this.formName)
      .subscribe((values) =>
        Object.keys(values)
          .filter((key) =>
            Object.prototype.hasOwnProperty.call(this.formGroup.controls, key),
          )
          .forEach((key) => this.formGroup.controls[key].setValue(values[key])),
      );
  }
  private getUrl(
    url: string | undefined,
    values: { [name: string]: string } | undefined,
  ) {
    if (!url) {
      return undefined;
    }
    const valueUrl = url.split('/').map((path) => {
      if (!path?.startsWith(':')) {
        return path || '';
      }
      const pathName = path.substring(1);
      return (values && values[pathName]) || undefined;
    });
    if (valueUrl.includes(undefined)) {
      return undefined;
    }
    return valueUrl.join('/');
  }
}
