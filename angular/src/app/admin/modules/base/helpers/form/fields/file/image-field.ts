import { FieldModel } from '../field-model';

export class ImageField extends FieldModel<string> {
  override controlType = 'image';
}
