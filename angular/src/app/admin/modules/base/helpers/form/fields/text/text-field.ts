import { FieldModel } from '../field-model';

export class TextField extends FieldModel<string> {
  override controlType = 'text';
}
