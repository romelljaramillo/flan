import { environment } from '../../../environments/environment';
import { RoleAttribute } from './interfaces/role.interface';

const base_url = environment.base_url;

export class RoleModel {
  constructor(public role: RoleAttribute) { }
}
