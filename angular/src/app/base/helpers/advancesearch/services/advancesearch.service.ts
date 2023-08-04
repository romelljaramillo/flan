import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { DataSearch, OptionsSearchResponse } from '../interfaces/advancesearch.interface';
import { map } from 'rxjs';
import { OptionsQuery } from 'src/app/base/interfaces/base.interface';
import { BaseService } from 'src/app/base/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdvanceSearchService {
  constructor(
    public http: HttpClient, 
  ) {}

  public filtersAdvanceSearch = new EventEmitter<OptionsQuery>();

  private USER_LOCAL_STORAGE_KEY = 'token';
  private base_url = environment.base_url;

  get headers() {
    return new HttpHeaders()
      .set('Accept-Language', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);
  }

  get token(): string {
    return localStorage.getItem(this.USER_LOCAL_STORAGE_KEY) || '';
  }

  getOptionsSearch(){
    const headers = this.headers;
    return this.http.get<OptionsSearchResponse>(`${this.base_url}/optionsearch`, { headers })
    .pipe(
      map((response: OptionsSearchResponse) => response.data));
  }

  advanceSearchToParams(filterAdvance: DataSearch[]) {
    let field:string = '';

    filterAdvance.forEach((item) => {
      field += `${item.field};${item.option};${item.value.trim()}|`;
    });

    if(field.slice(-1) === '|'){
      field = field.substring(0, field.length - 1)
    }
    return field;
  }
}
