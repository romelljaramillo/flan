import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/services/auth.service';
import { FieldResponseList } from '../helpers/list/interfaces/list.interface';
import { FieldResponseForm } from '../helpers/form/interfaces/form.interface';
import { AdvanceSearchService } from '../helpers/advancesearch/services/advancesearch.service';
import { HandleError } from '../../shared/errors/handle-error';
import { DefaultResponse, OptionsQuery } from '../interfaces/base.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BaseService{
  public url: string = '';
  public entity: string = '';
  public headers: HttpHeaders = this.authService.headers;

  constructor(
    public http: HttpClient, 
    public authService: AuthService,
    public advanceSearchService: AdvanceSearchService
  ) {
    this.init();
  }

  init() {
    this.entity = '';
  }

  getAll(optionsQuery: OptionsQuery): Observable<DefaultResponse> {
    let params;
    const { page, perPage, orderBy, column, filter, filterAdvance } = optionsQuery;

    if(filterAdvance.length > 0){
      let filters = this.advanceSearchService.advanceSearchToParams(filterAdvance);
      params = new HttpParams({fromObject: { page, perPage, orderBy, column, filters}});
    } else {
      params = new HttpParams({fromObject: { page, perPage, orderBy, column, filter}});
    }

    const headers = this.authService.headers;
    return this.http.get<DefaultResponse>(`${base_url}/${this.url}`, { headers, params })
    .pipe(map(response => response), catchError(HandleError.message));
  }

  getById(id: string) {
    const headers = this.authService.headers;
    return this.http.get<any>(`${base_url}/${this.url}/${id}`, { headers })
    .pipe(map(response => response), catchError(HandleError.message));
  }

  create(record: any) {
    const headers = this.authService.headers;
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http.post(`${base_url}/${this.url}`, formData, { headers })
    .pipe(map(response => response), catchError(HandleError.message));
  }

  update(id: string, record: any) {
    const headers = this.authService.headers;
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    formData.append('_method', 'PUT');

    return this.http.post(`${base_url}/${this.url}/${id}`, formData, { headers })
    .pipe(map(response => response), catchError(HandleError.message));
  }

  delete(id: string) {
    const headers = this.authService.headers;
    return this.http.delete(`${base_url}/${this.url}/${id}`, { headers })
    .pipe(map(response => response), catchError(HandleError.message));
  }

  getFieldsList() {
    const headers = this.authService.headers;
    return this.http.get<FieldResponseList>(`${base_url}/${this.url}/fieldslist`, {headers})
    .pipe(map((response:FieldResponseList) => response.data.fields), catchError(HandleError.message));
  }

  getFieldsForm() {
    const headers = this.authService.headers;
    return this.http.get<FieldResponseForm>(`${base_url}/${this.url}/fieldsform`, {headers})
    .pipe(map((response:FieldResponseForm) => response.data.fields), catchError(HandleError.message));
  }
}
