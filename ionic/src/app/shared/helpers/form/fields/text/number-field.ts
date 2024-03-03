import { FieldModel } from '../field-model';

export class NumberField extends FieldModel<string> {
  override controlType = 'number';
}
