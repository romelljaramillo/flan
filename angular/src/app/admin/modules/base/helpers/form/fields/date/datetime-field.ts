import { FieldModel } from '../field-model';

export class DatetimeField extends FieldModel<string> {
  override controlType = 'datetime';
}
