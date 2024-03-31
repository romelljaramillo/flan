import { EventEmitter, Injectable } from '@angular/core';

import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { OptionsQuery } from '@shared/components/list/interfaces/list.interface';
import { DataSearch, OptionsSearchResponse } from '../interfaces/advancesearch.interface';

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
  private baseUrl = environment.API_BASE_URL;

  get token(): string {
    return localStorage.getItem(this.USER_LOCAL_STORAGE_KEY) || '';
  }

  getOptionsSearch(){
    return this.http.get<OptionsSearchResponse>(`${this.baseUrl}/optionsearch`)
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
