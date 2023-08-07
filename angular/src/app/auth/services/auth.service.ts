import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from 'src/app/shared/errors/error-handler.service';
import { NotificationService } from '../../shared/notification/notification.service';

import {
  AuthCheckResponse,
  AuthDataRequest,
  AuthResponse,
} from '../interfaces/auth';
import { UserAttribute } from '../../user/interfaces/user.interface';
import { UserModel } from '../../user/user.model';
import { RouteDataPermission } from 'src/app/permission/interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public USER_LOCAL_STORAGE_KEY = 'token';
  public baseUrl = environment.baseUrl;
  public user: UserAttribute | any;
  public _entity: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public errorHandlerService: ErrorHandlerService,
    public notification: NotificationService
  ) {}

  get entity(): string {
    return this._entity;
  }

  set entity(entity: string) {
    this._entity = entity;
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

  set token(token: string) {
    localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, token);
  }

  get userSession(): UserAttribute {
    return this.user.user;
  }

  logout(): void {
    this.http
      .get(`${this.baseUrl}/logout`, { headers: this.headers })
      .subscribe(() => {
        this.clearToken();
        this.redirectToLogin();
      });
  }

  loginUser(formData: AuthDataRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, formData).pipe(
      tap((response) => {
        console.log(response);
        
        if (!response.data.token) {
          this.notification.error('Oops algo ha pasado, token no es valido!', {
            text: 'Vuelve a intentarlo',
            icon: 'error',
          });

          this.redirectToLogin();
        }

        this.token = response.data.token;
      }),
      tap(() => this.redirectToDashboard()),
      catchError( error => this.errorHandlerService.handleError(error))
    );
  }

  private clearToken() {
    localStorage.removeItem(this.USER_LOCAL_STORAGE_KEY);
    this.redirectToLogin();
  }

  isLoggedIn(): Observable<boolean> {
    if (!this.token) {
      return of(false);
    }

    return this.http
      .get<AuthCheckResponse>(`${this.baseUrl}/check-token`, {
        headers: this.headers,
      })
      .pipe(
        map((response: AuthCheckResponse) => {
          console.log(response);
          if (!response.data.checkToken) {
            this.clearToken();
            return false;
          }
          this.user = new UserModel(response.data.user.attribute);
          return true;
        }),
        catchError(() => {
          this.clearToken();
          return of(false);
        })
      );
  }

  checkPermission(dataPermission: RouteDataPermission): Observable<boolean> {
    let permission = '';
    if(this.entity === '') {
      permission = dataPermission.entity + '.' + dataPermission.action;
    } else {
      permission = this.entity + '.' + dataPermission.action;
    }
    console.log(permission);
    return this.http
    .post(`${this.baseUrl}/check-permissions`, {permission}, {headers: this.headers})
    .pipe(
      map((response: any) => response.can),
      catchError(() => of(false))
    );
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
