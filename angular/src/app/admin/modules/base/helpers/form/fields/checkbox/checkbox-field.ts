import { FieldModel } from "../field-model";

export class CheckboxField extends FieldModel<string> {
  override controlType = 'checkbox';
}
