import { environment } from '../../environments/environment';
import { UserAttribute } from './interfaces/user.interface';

export class UserModel {
  constructor(public user: UserAttribute) { }
}
