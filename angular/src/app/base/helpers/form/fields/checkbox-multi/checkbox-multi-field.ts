import { FieldModel } from "../field-model";

export class CheckboxMultiField extends FieldModel<string> {
  override controlType = 'checkbox-multi';
}
