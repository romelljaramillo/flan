import { Injectable, OnInit, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { FieldResponseList } from '../helpers/list/interfaces/list.interface';
import { FieldResponseForm } from '../helpers/form/interfaces/form.interface';
import { AdvanceSearchService } from '../helpers/advancesearch/services/advancesearch.service';
import { DefaultResponse, OptionsQuery } from '../interfaces/base.interface';
import { ErrorHandlerService } from 'src/app/shared/errors/error-handler.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public USER_LOCAL_STORAGE_KEY = 'token';
  public base_url = environment.base_url;
  public url: string = '';
  public entity: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public advanceSearchService: AdvanceSearchService,
    public errorHandlerService: ErrorHandlerService,
    public notification: NotificationService
  ) {
    this.init();
  }

  get headers() {
    return new HttpHeaders()
      .set('Accept-Language', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);
    // .set("Content-Type", "multipart/form-data")
  }

  get token(): string {
    return localStorage.getItem(this.USER_LOCAL_STORAGE_KEY) || '';
  }

  init() {
    this.entity = '';
  }

  getAll(optionsQuery: OptionsQuery): Observable<DefaultResponse> {
    const { page, perPage, orderBy, column, filter, filterAdvance } = optionsQuery;
    let params = new HttpParams();

    if (filterAdvance && filterAdvance.length > 0) {
      const filters =
        this.advanceSearchService.advanceSearchToParams(filterAdvance);
      params = params.appendAll({ page, perPage, orderBy, column, filters });
    } else {
      params = params.appendAll({ page, perPage, orderBy, column, filter });
    }

    return this.http
      .get<DefaultResponse>(`${this.base_url}/${this.url}`, {
        headers: this.headers,
        params,
      })
      .pipe(
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  getById(id: string) {
    return this.http
      .get<any>(`${this.base_url}/${this.url}/${id}`, { headers: this.headers })
      .pipe(
        map((response) => response),
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  create(record: any) {
    const headers = this.headers;
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http
      .post(`${this.base_url}/${this.url}`, formData, { headers })
      .pipe(
        map((response) => response),
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  update(id: string, record: any) {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    formData.append('_method', 'PUT');

    return this.http
      .post(`${this.base_url}/${this.url}/${id}`, formData, {
        headers: this.headers,
      })
      .pipe(
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  delete(id: string) {
    return this.http
      .delete(`${this.base_url}/${this.url}/${id}`, { headers: this.headers })
      .pipe(
        map((response) => response),
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  getFieldsList() {
    return this.http
      .get<FieldResponseList>(`${this.base_url}/${this.url}/fieldslist`, {
        headers: this.headers,
      })
      .pipe(
        map((response: FieldResponseList) => response.data.fields),
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  getFieldsForm() {
    return this.http
      .get<FieldResponseForm>(`${this.base_url}/${this.url}/fieldsform`, {
        headers: this.headers,
      })
      .pipe(
        map((response: FieldResponseForm) => response.data.fields),
        catchError( error => this.errorHandlerService.handleError(error))
      );
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
