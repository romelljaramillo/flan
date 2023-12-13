import { FieldModel } from '../field-model';

export class RadioField extends FieldModel<string> {
  override controlType = 'radio';
}
