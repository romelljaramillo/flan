export interface UserResponse {
  data:  UserResponseData[];
  links: UserResponseLinks;
  meta:  UserResponseMeta;
}

export interface UserResponseData {
  type:      string;
  id:        string;
  attribute: UserAttribute;
  links:     UserLink;
}

export interface UserAttribute {
  id:                   string;
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

export interface UserResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface UserResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        UserMetaLink | undefined;
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface UserMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
