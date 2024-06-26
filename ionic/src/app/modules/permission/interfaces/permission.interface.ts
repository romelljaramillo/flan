export interface PermissionAttribute {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
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

export interface Permission {
  id:    number;
  value: string;
}