import { environment } from '../../environments/environment';
import { UserAttribute } from './interfaces/user.interface';

const base_url = environment.base_url;

export class UserModel {
  constructor(public user: UserAttribute) { }
}
