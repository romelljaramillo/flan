import { EventEmitter, Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {
  AuthCheckResponse,
  AuthDataRequest,
  AuthResponse,
} from '../interfaces/auth';

import { UserAttribute } from '../../user/interfaces/user.interface';

import { UserModel } from '../../user/user.model';
import { HandleError } from '../../shared/errors/handle-error';
import { Alert } from 'src/app/shared/alert/alert';

const base_url = environment.base_url;
const USER_LOCAL_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: UserAttribute | any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get token(): string {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY) ? true : false;
  }

  get headers() {
    return new HttpHeaders()
      .set('Accept-Language', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);
    // .set("Content-Type", "multipart/form-data")
  }

  get userSession(): UserAttribute {
    return this.user.user;
  }

  logout(): void {
    this.http
      .get(`${base_url}/logout`, { headers: this.headers })
      .subscribe(() => {
        this.clearToken();
        this.redirectToLogin();
      });
  }

  postLogin(formData: AuthDataRequest) {
    return this.http.post<AuthResponse>(`${base_url}/login`, formData).pipe(
      tap((response) => {
        if (!response.data.token) {
          Alert.error('Oops algo ha pasado, token no es valido!', {
            text: 'Vuelve a intentarlo',
            icon: 'error',
          });

          this.redirectToLogin();
        }

        this.setToken(response.data.token);
      }),
      tap(() => this.redirectToDashboard()),
      catchError(HandleError.message)
    );
  }

  private setToken(token: string) {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, token);
  }

  private clearToken() {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    this.redirectToLogin();
  }

  private redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  private redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  checkToken(): Observable<boolean> {
    if (!this.token) {
      return of(false);
    }

    return this.http
      .get<AuthCheckResponse>(`${base_url}/checkToken`, { headers: this.headers})
      .pipe(map((response: AuthCheckResponse) => {
        console.log(response);
          if (!response.success) {
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

}
