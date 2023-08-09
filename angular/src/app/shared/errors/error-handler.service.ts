import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private notificationService: NotificationService,
    public router: Router,
  ) {}

  handleError(error: HttpErrorResponse) {
    let message = '';
    let title = error.error.message
      ? error.error.message
      : 'Oops algo ha pasado!';

    switch (error.status) {
      case 0:
        message =
          'Error del lado del cliente, si el problema persiste contacte con el técnico';
        break;
      case 401:
        message = 'Usuario ó contraseña no valido';
        break;
      case 403:
        message = 'No tiene permisos para realizar esta acción';
        this.router.navigate(['403-unauthorized']);
        break;
      case 500:
        message = '500 Internal Server Error';
        break;
      default:
        message = `Error code ${error.status}`;
        break;
    }

    this.notificationService.error(title, {
      text: message,
      icon: 'error',
    });

    console.error(
      `Erro devuelto code ${error.status}, response: `,
      error.error
    );

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
