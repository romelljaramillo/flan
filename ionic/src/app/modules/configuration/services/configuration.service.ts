import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";
import { ConfigurationAttribute } from "../interfaces/configuration.interface";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService extends BaseService<ConfigurationAttribute> {
  override url = "configurations";
  override entity = "configurations";

  /* override create<T>(record: T): Observable<T> {
    let formData: any = new FormData();

    for (const key in record) {
      formData.append(`${key}`, record[key]);
    }

    return this.http
      .post<T>(`${this.baseUrl}/${this.url}`, formData)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  } */
}
