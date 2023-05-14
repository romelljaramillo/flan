export interface RolesResponse {
  data: RoleResponseData[];
  links: RolesResponseLinks;
  meta: RolesResponseMeta;
}

export interface RoleResponseData {
  type: string;
  id: string;
  attribute: RoleAttribute;
  links: RoleLink;
}

export interface RoleAttribute {
  id: string;
  name: string;
  permissions: RolePermissions;
  created: string;
  updated: string;
}

export interface RolePermissions {
  id: string;
  value: string;
}

export interface RoleLink {
  self: string;
}

export interface RolesResponseLinks {
  first: string;
  last: string;
  prev: null | string;
  next: string;
}

export interface RolesResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: RolesMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface RolesMetaLink {
  url: null | string;
  label: string;
  active: boolean;
}
export interface PermissionsResponse {
  data: PermissionsCrud;
  message: string;
  success: boolean;
}

export interface PermissionsCrud {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
