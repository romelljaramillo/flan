import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { AdvanceSearchService } from '../helpers/advancesearch/services/advancesearch.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/errors/error-handler.service';
import {
  FieldResponseList,
  OptionsQuery,
} from '../helpers/list/interfaces/list.interface';
import { FieldResponseForm } from '../helpers/form/interfaces/form.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  public url: string = '';
  public entity: string = '';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected advanceSearchService: AdvanceSearchService,
    protected errorHandlerService: ErrorHandlerService
  ) {}

  getAll(optionsQuery: OptionsQuery): Observable<T> {
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
      .get<T>(`${environment.baseUrl}/${this.url}`, {
        headers: this.authService.headers,
        params,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getById(id: string): Observable<T> {
    return this.http
      .get<T>(`${environment.baseUrl}/${this.url}/${id}`, {
        headers: this.authService.headers,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  create<T>(record: T): Observable<T> {
    const headers = this.authService.headers;
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http
      .post<T>(`${environment.baseUrl}/${this.url}`, formData, { headers })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  update<T>(id: string, record: T): Observable<T> {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    formData.append('_method', 'PUT');

    return this.http
      .post<T>(`${environment.baseUrl}/${this.url}/${id}`, formData, {
        headers: this.authService.headers,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  delete(id: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.baseUrl}/${this.url}/${id}`, {
        headers: this.authService.headers,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getFieldsList(): Observable<FieldResponseList> {
    return this.http
      .get<FieldResponseList>(`${environment.baseUrl}/${this.url}/fieldslist`, {
        headers: this.authService.headers,
      })
      .pipe(
        map((response: FieldResponseList) => response),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }

  getFieldsForm() {
    return this.http
      .get<FieldResponseForm>(`${environment.baseUrl}/${this.url}/fieldsform`, {
        headers: this.authService.headers,
      })
      .pipe(
        map((response: FieldResponseForm) => response.data.fields),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }
}
