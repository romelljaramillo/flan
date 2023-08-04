import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import {
  AuthCheckResponse,
  AuthDataRequest,
  AuthResponse,
} from '../interfaces/auth';
import { UserAttribute } from '../../user/interfaces/user.interface';
import { UserModel } from '../../user/user.model';
import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService{

  public user: UserAttribute | any;

  get userSession(): UserAttribute {
    return this.user.user;
  }

  logout(): void {
    this.http
      .get(`${this.base_url}/logout`, { headers: this.headers })
      .subscribe(() => {
        this.clearToken();
        this.redirectToLogin();
      });
  }

  loginUser(formData: AuthDataRequest) {
    return this.http.post<AuthResponse>(`${this.base_url}/login`, formData).pipe(
      tap((response) => {
        console.log(response);
        
        if (!response.data.token) {
          this.notification.error('Oops algo ha pasado, token no es valido!', {
            text: 'Vuelve a intentarlo',
            icon: 'error',
          });

          this.redirectToLogin();
        }

        this.setToken(response.data.token);
      }),
      tap(() => this.redirectToDashboard()),
      catchError( error => this.errorHandlerService.handleError(error))
    );
  }

  private setToken(token: string) {
    localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, token);
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
      .get<AuthCheckResponse>(`${this.base_url}/check-token`, {
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
}
