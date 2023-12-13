import { FieldModel } from '../field-model';

export class SelectField extends FieldModel<string> {
  override controlType = 'select';
}
