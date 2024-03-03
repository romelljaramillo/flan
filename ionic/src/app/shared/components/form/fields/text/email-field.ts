import { FieldModel } from '../field-model';

export class EmailField extends FieldModel<string> {
  override controlType = 'email';
}
