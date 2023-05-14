export interface UsersResponse {
  data:  UserResponseData[];
  links: UsersResponseLinks;
  meta:  UsersResponseMeta;
}

export interface UserResponseData {
  type:      string;
  id:        string;
  attribute: UserAttribute;
  links:     UserLink;
}

export interface UserAttribute {
  id:                   string;
  fullname:             string;
  first_name:           string;
  last_name:            string;
  name:                 string;
  email:                string;
  email_verified:       string;
  two_factor_confirmed: null | string;
  current_team_id:      null | string;
  photo:                string;
  active:               boolean;
  created:              string;
  updated:              string;
  deleted:              null | string;
}

export interface UserLink {
  self: string;
}

export interface UsersResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface UsersResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        UsersMetaLink[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface UsersMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
