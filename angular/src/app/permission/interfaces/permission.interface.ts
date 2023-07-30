export interface PermissionsResponse {
  data: PermissionResponseData[];
  links: PermissionsResponseLinks;
  meta: PermissionsResponseMeta;
}

export interface PermissionResponseData {
  type: string;
  id: string;
  attribute: PermissionAttribute;
  links: PermissionLinks;
}

export interface PermissionAttribute {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  value: string;
}

export interface PermissionLinks {
  self: string;
}

export interface PermissionsResponseLinks {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface PermissionsResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PermissionsMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PermissionsMetaLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface HasPermissionsResponse {
  data: PermissionsData;
  message: string;
  success: string;
}

export interface PermissionsData {
  hasPermission: boolean;
}
