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
};
export type EnumFieldOptions = { type: 'enum'; values: Enum };
export type DateFieldOptions = {
  type: 'date';
  dateType?: 'year' | 'month' | 'day';
};
export type SelectFieldOptions = {
  type: 'select';
  many?: boolean;
  itemType: string;
};
export type ArrayFieldOptions = { type: 'array' };
export type CreateArray = {
  type: 'create-array';
  formName: string;
  itemType: Constructor;
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
export type FormFields = {
  [fieldName: string]: FieldOptions & CommonFieldOptions;
};

declare global {
  interface Window {
    forms: { [formName: string]: FormFields };
  }
}

const forms: { [formName: string]: FormFields } = {};

export const Field: (
  options: FieldOptions & CommonFieldOptions,
) => PropertyDecorator = (options) => (target, propertyName) => {
  if (window) {
    if (window.forms) {
      window.forms = forms;
    }
  }
  if (!forms[options.form]) {
    forms[options.form] = {};
  }
  forms[options.form][propertyName.toString()] = options;
};

export function getForm(formName: string) {
  return forms[formName];
}
