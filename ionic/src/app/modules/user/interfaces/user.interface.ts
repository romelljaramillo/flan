import { Role } from "@modules/role/interfaces/role.interface";



export interface UserAttribute {
  id:                   string;
  first_name:           string;
  last_name:            string;
  name:                 string;
  email:                string;
  email_verified:       string;
  two_factor_confirmed: null | string;
  current_team_id:      null | string;
  avatar:               string;
  active:               boolean;
  roles:                Role[];
  created:              string;
  updated:              string;
  deleted:              null | string;
}