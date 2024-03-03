export interface PermissionResponse {
  data: PermissionResponseData[];
  links: PermissionResponseLinks;
  meta: PermissionResponseMeta;
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

export interface PermissionLinks {
  self: string;
}

export interface PermissionResponseLinks {
  first: string;
  last: string;
  prev: null | string;
  next: string;
}

export interface PermissionResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PermissionMetaLink | undefined;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PermissionMetaLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface HasPermissionResponse {
  data: PermissionData;
  message: string;
  success: string;
}

export interface PermissionData {
  hasPermission: boolean;
}

export interface RouteDataPermission {
  title?: string;
  entity?: string;
  action?: ActionCrud;
}

export enum ActionCrud {
  list = 'index',
  view = 'show',
  create = 'create',
  edit = 'update',
  delete = 'delete',
}

