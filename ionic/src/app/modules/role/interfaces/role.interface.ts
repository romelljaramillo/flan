export interface RoleResponse {
  data:  RoleResponseData[] | RoleResponseData;
  links?: RoleResponseLinks;
  meta?:  RoleResponseMeta;
}

export interface RoleResponseData {
  type:      string;
  id:        string;
  attribute: RoleAttribute;
  links:     RoleLink;
}

export interface RoleAttribute {
  id: string;
  name: string;
  permissions: RolePermissions;
  created: string;
  updated: string;
}

export interface RoleLink {
  self: string;
}

export interface RolePermissions {
  id: string;
  name: string;
}

export interface RoleResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface RoleResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links?:       RoleMetaLink;
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface RoleMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}

export interface Role {
  id:    number;
  value: string;
}
