import { EventEmitter, Injectable } from '@angular/core';

import { DataSearch, OptionsSearchResponse } from '../interfaces/advancesearch.interface';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OptionsQuery } from '../../list/interfaces/list.interface';

@Injectable({
  providedIn: 'root',
})
export class AdvanceSearchService {
  constructor(
    public http: HttpClient,
    private authService: AuthService
  ) {}

  public filtersAdvanceSearch = new EventEmitter<OptionsQuery>();

  private USER_LOCAL_STORAGE_KEY = 'token';
  // private base_url = environment.base_url;

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
    return this.http.get<OptionsSearchResponse>(`${this.authService.baseUrl}/optionsearch`, { headers })
    .pipe(map((response: OptionsSearchResponse) => response.data));
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
