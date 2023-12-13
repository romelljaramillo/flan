import { FieldModel } from '../field-model';
export class HiddenField extends FieldModel<string> {
  override controlType = 'hidden';
}
