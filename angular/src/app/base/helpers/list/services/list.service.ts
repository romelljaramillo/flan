import { EventEmitter, Injectable } from '@angular/core';
import { FieldList } from '../interfaces/list.interface';
import { OptionsQuery } from 'src/app/base/interfaces/base.interface';
import { PermissionsData } from 'src/app/permission/interfaces/permission.interface';

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
  public permissions: PermissionsData = {hasPermission: false};

  constructor() {}
}
