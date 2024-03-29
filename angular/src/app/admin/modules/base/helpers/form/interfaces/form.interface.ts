import { FieldModel } from "../fields/field-model";

export interface FormActive {
  active: boolean;
  id?:    string;
}

export interface FieldResponseForm {
  success: string;
  data:    FieldData;
  message: string;
}

export interface OptionInput {
  id: string; 
  name?: string;
}

export interface FieldData {
  fields: FieldModel<string>[];
}

export interface FieldForm<T = any>  {
  value?: T;
  key?:   string;
  label?:   string;
  type?:    string; // 'select', 'bool', 'date', 'datetime', 'decimal', 'float', 'percent', 'editable', 'price'
  controlType?:    string; // 'select', 'bool', 'date', 'datetime', 'decimal', 'float', 'percent', 'editable', 'price'
  class?:   string; // CSS
  placeholder?:   string; // CSS
  search?:  boolean; // true, false
  required?: boolean;
  order?: number;
  options?: OptionInput[];
  primarykey?: boolean;
  defaultValue?: any;
  multiple?: boolean; // CSS
}
