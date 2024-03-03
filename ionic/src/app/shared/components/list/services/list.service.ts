import { EventEmitter, Injectable } from '@angular/core';
import { FieldList, OptionsQuery } from '../interfaces/list.interface';
import { PermissionData } from '@adminModule/permission/interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  // public isAdvanceSearch: boolean = true;
  public total: number = 0;
  public fields: FieldList[] = [];
  public data: Array<any> = [];
  public deleteAction = new EventEmitter<string>();
  public filters = new EventEmitter<OptionsQuery>();
  public permission: PermissionData = {hasPermission: false};

}
