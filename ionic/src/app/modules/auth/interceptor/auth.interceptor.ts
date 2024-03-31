import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

const USER_LOCAL_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.token;

    if (token === null || this.isThirdPartyRequest(req.url)) {
      return next.handle(req);
    }

    const requestWithHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(requestWithHeader);
  }
  
  private isThirdPartyRequest(url: string): boolean {
    return url.startsWith(environment.API_BASE_URL) === false;
  }
}