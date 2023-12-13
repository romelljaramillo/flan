import { FieldModel } from '../field-model';

export class FileField extends FieldModel<string> {
  override controlType = 'file';
}
