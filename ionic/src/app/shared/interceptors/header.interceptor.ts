import type { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).token;

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(newReq);
  
};
