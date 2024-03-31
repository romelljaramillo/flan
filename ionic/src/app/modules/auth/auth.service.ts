import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { NotificationService } from '@shared/services/notification.service';

import {
  AuthCheckResponse,
  AuthDataRequest,
  AuthResponse,
} from './auth.interface';
import { UserAttribute } from '@modules/user/interfaces/user.interface';
import { UserModel } from '@modules/user/user.model';
import { isPlatformBrowser } from '@angular/common';
import { RouteDataPermission } from '@modules/permission/interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public USER_LOCAL_STORAGE_KEY = 'TOKEN';
  public baseUrl = environment.API_BASE_URL;
  public user: UserAttribute | any;
  public _entity: string = '';

  constructor(
    private http: HttpClient,
    public router: Router,
    public errorHandlerService: ErrorHandlerService,
    public notification: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get entity(): string {
    return this._entity;
  }

  set entity(entity: string) {
    this._entity = entity;
  }

  get token(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.USER_LOCAL_STORAGE_KEY) || '';
    }
    return '';
  }

  set token(token: string) {
    localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, token);
  }

  get userSession(): UserAttribute {
    return this.user.user;
  }

  logout(): void {
    this.http.get(`${this.baseUrl}/logout`).subscribe(() => {
      this.clearToken();
      this.redirectToLogin();
    });
  }

  login(formData: AuthDataRequest): Observable<boolean | any> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, formData).pipe(
      tap((response) => {
        if (!response.data.token) {
          this.notification.error('Oops algo ha pasado, token no es valido!', {
            text: 'Vuelve a intentarlo',
            icon: 'error',
          });
        }
        this.token = response.data.token;
      }),
      tap(() => this.redirectToDashboard()),
      catchError((error) => this.errorHandlerService.handleError(error))
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

    return this.http.get<AuthCheckResponse>(`${this.baseUrl}/check-token`).pipe(
      map((response: AuthCheckResponse) => {
        if (!response.data.checkToken) {
          this.clearToken();
          return false;
        }
        const user: UserAttribute = response.data.user.attribute as UserAttribute;

        this.user = new UserModel(user);
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
    if (this.entity === '') {
      permission = dataPermission.entity + '.' + dataPermission.action;
    } else {
      permission = this.entity + '.' + dataPermission.action;
    }
    return this.http
      .post(`${this.baseUrl}/check-permissions`, { permission })
      .pipe(
        map((response: any) => response.can),
        catchError(() => of(false))
      );
  }

  redirectToDashboard(): void {
    this.router.navigate([environment.URL_DASHBOARD]);
  }

  redirectToLogin(): void {
    this.router.navigate([environment.URL_LOGIN]);
  }
}
