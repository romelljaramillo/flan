import { FieldModel } from '../field-model';

export class PasswordField extends FieldModel<string> {
  override controlType = 'password';
}
