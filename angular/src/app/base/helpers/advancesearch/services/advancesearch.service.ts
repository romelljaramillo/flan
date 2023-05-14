import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environment';
import { DataSearch, OptionsSearchResponse } from '../interfaces/advancesearch.interface';
import { map } from 'rxjs';
import { OptionsQuery } from 'src/app/base/interfaces/base.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AdvanceSearchService {

  public filtersAdvanceSearch = new EventEmitter<OptionsQuery>();

  private url: string = 'optionsearch';
  
  constructor(public http: HttpClient, public authService: AuthService) {}

  getOptionsSearch(){
    const headers = this.authService.headers;
    return this.http.get<OptionsSearchResponse>(`${base_url}/${this.url}`, { headers })
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
