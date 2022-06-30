export type Enum = { [name: string]: string | number };
export type Form = { [field: string]: unknown };

// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor = Function;

export type CommonFieldOptions = {
  form: string;
  index: number;
  required?: boolean;
  readonly?: boolean;
  hint?: string;
  disable?: ((form: Form) => boolean) | boolean;
  hidden?: ((form: Form) => boolean) | boolean;
};

export type NumberField = {
  type: 'number';
  max?: number;
  min?: number;
};
export type TextFieldOptions = {
  type: 'text';
  maxLength?: number;
  minLength?: number;
  mask?: string;
};
export type EnumFieldOptions = {
  type: 'enum';
  values: Enum;
  i18nPrefix: string;
};
export type DateFieldOptions = {
  type: 'date';
  dateType?: 'year' | 'month' | 'day';
};
export type SelectFieldOptions = {
  type: 'select';
  url: string;
  i18nSelectName?: string;
  multiple?: false;
  getValue: (item: unknown) => unknown;
  getDisplayValue: (item: unknown) => unknown;
};
export type ArrayFieldOptions = { type: 'array' };
export type CreateArray = {
  type: 'create-array';
  formName: string;
};
export type BooleanFieldOptions = { type: 'boolean'; invert?: boolean };

export type FieldOptions =
  | NumberField
  | TextFieldOptions
  | EnumFieldOptions
  | DateFieldOptions
  | SelectFieldOptions
  | BooleanFieldOptions
  | CreateArray;

export type FormField = FieldOptions & CommonFieldOptions;
export type FormFields = {
  [fieldName: string]: FormField;
};

export type FormCommon = {
  i18nName?: string;
  valueUrl?: string;
  createUrl?: string;
  updateUrl?: string;
  progress?: boolean;
  index?: number;
};

export type FormOptions = FormCommon & {
  form: string;
};

export type FormInfo = FormCommon & {
  fields: FormFields;
};

declare global {
  interface Window {
    forms: {
      [formName: string]: FormInfo;
    };
  }
}

const forms: { [formName: string]: FormInfo } = {};

export const Field: (
  options: FieldOptions & CommonFieldOptions,
) => PropertyDecorator = (options) => (target, propertyName) => {
  if (typeof window !== 'undefined') {
    if (!window.forms) {
      window.forms = forms;
    }
  }
  if (!forms[options.form]) {
    forms[options.form] = { fields: {} };
  }
  forms[options.form].fields[propertyName.toString()] = options;
};

export const Form: (options: FormOptions) => ClassDecorator =
  (options) => (target) => {
    if (typeof window !== 'undefined') {
      if (!window.forms) {
        window.forms = forms;
      }
    }
    if (!forms[options.form]) {
      forms[options.form] = { fields: {} };
    }
    forms[options.form] = { ...forms[options.form], ...options };
  };

export function getForms() {
  return forms;
}
