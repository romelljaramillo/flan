import { FieldModel } from '../field-model';

export class DateField extends FieldModel<string> {
  override controlType = 'date';
}
