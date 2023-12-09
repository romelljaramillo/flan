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
  private baseUrl = environment.API_BASE_URL;

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
      .get<T>(`${this.baseUrl}/${this.url}`, {
        params,
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getById(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${this.url}/${id}`, {
      })
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  create<T>(record: T): Observable<T> {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http
      .post<T>(`${this.baseUrl}/${this.url}`, formData)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  update<T>(id: string, record: T): Observable<T> {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    formData.append('_method', 'PUT');

    return this.http
      .post<T>(`${this.baseUrl}/${this.url}/${id}`, formData)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  delete(id: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${this.url}/${id}`)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  getFieldsList(): Observable<FieldResponseList> {
    return this.http
      .get<FieldResponseList>(`${this.baseUrl}/${this.url}/fieldslist`)
      .pipe(
        map((response: FieldResponseList) => response),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }

  getFieldsForm() {
    return this.http
      .get<FieldResponseForm>(`${this.baseUrl}/${this.url}/fieldsform`)
      .pipe(
        map((response: FieldResponseForm) => response.data.fields),
        catchError((error) => this.errorHandlerService.handleError(error))
      );
  }
}
