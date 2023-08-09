import { FieldForm, OptionInput } from "../interfaces/form.interface";

export class FieldModel<T> {
  value: any | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  class: string;
  placeholder: string;
  options: OptionInput[];
  primarykey: boolean;
  defaultValue: any;
  multiple: boolean;

  constructor(
    options: FieldForm = {key: ""}
  ){
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.class = options.class || '';
    this.options = options.options || [];
    this.primarykey = !!options.primarykey;
    this.defaultValue = options.defaultValue  || '';
    this.multiple = options.multiple  || false;
  }

  getOption(){
    return this.options;
  }
}
