import { FieldModel } from "../field-model";

export class SwitchField extends FieldModel<string> {
  override controlType = 'switch';
}
