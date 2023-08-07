import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FieldResponseList } from '../helpers/list/interfaces/list.interface';
import { FieldResponseForm } from '../helpers/form/interfaces/form.interface';
import { AdvanceSearchService } from '../helpers/advancesearch/services/advancesearch.service';
import { DefaultResponse, OptionsQuery } from '../interfaces/base.interface';
import { ErrorHandlerService } from 'src/app/shared/errors/error-handler.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public url: string = '';
  public entity: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthService,
    public advanceSearchService: AdvanceSearchService,
    public errorHandlerService: ErrorHandlerService,
    public notification: NotificationService
  ) {}

  getAll(optionsQuery: OptionsQuery): Observable<DefaultResponse> {
    const { page, perPage, orderBy, column, filter, filterAdvance } =
      optionsQuery;
    let params = new HttpParams();

    if (filterAdvance && filterAdvance.length > 0) {
      const filters =
        this.advanceSearchService.advanceSearchToParams(filterAdvance);
      params = params.appendAll({ page, perPage, orderBy, column, filters });
    } else {
      params = params.appendAll({ page, perPage, orderBy, column, filter });
    }

    return this.http
      .get<DefaultResponse>(`${this.authService.baseUrl}/${this.url}`, {
        headers: this.authService.headers,
        params,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getById(id: string) {
    return this.http
      .get<any>(`${this.authService.baseUrl}/${this.url}/${id}`, { headers: this.authService.headers })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  create(record: any) {
    const headers = this.authService.headers;
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http
      .post(`${this.authService.baseUrl}/${this.url}`, formData, { headers })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  update(id: string, record: any) {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    formData.append('_method', 'PUT');

    return this.http
      .post(`${this.authService.baseUrl}/${this.url}/${id}`, formData, {
        headers: this.authService.headers,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  delete(id: string) {
    return this.http
      .delete(`${this.authService.baseUrl}/${this.url}/${id}`, { headers: this.authService.headers })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getFieldsList() {
    return this.http
      .get<FieldResponseList>(`${this.authService.baseUrl}/${this.url}/fieldslist`, {
        headers: this.authService.headers,
      })
      .pipe(
        map((response: FieldResponseList) => response.data.fields),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }

  getFieldsForm() {
    return this.http
      .get<FieldResponseForm>(`${this.authService.baseUrl}/${this.url}/fieldsform`, {
        headers: this.authService.headers,
      })
      .pipe(
        map((response: FieldResponseForm) => response.data.fields),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }
}
