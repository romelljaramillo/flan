import { FieldModel } from '../field-model';

export class TextareaField extends FieldModel<string> {
  override controlType = 'textarea';
}
