import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '@auth/auth.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { AdvanceSearchService } from '@shared/components/advancesearch/services/advancesearch.service';
import { FieldResponseList, OptionsQuery } from '@shared/components/list/interfaces/list.interface';
import { FieldResponseForm } from '@shared/components/form/interfaces/form.interface';
import { BaseAttribute, BaseResponse, BaseResponseData } from '@core/interfaces/base.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<
T extends BaseResponse,
D extends BaseResponseData,
A extends BaseAttribute
> {
  public url: string = '';
  public entity: string = '';
  public baseUrl = environment.API_BASE_URL;

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
      .get<T>(`${this.baseUrl}/${this.url}/${id}`, {})
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

  /**
   * Actualiza un registro existente por su ID con los nuevos datos proporcionados.
   * Utiliza FormData para permitir la actualización de archivos si es necesario.
   * @param id El ID del registro a actualizar.
   * @param record Los datos actualizados del registro.
   * @returns Un Observable de tipo T con la respuesta del servidor.
   */
  update(id: string, record: A): Observable<T> {
    let formData = new FormData();

    Object.entries(record).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('_method', 'PUT');

    return this.http
    .post<T>(`${this.baseUrl}/${this.url}/${id}`, formData)
    .pipe(catchError(error => this.errorHandlerService.handleError(error)));
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
