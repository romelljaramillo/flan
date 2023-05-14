import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Alert } from 'src/app/shared/alert/alert';

export class HandleError {

  static message(error: HttpErrorResponse) {
    let message = '';
    let title = (error.error.message) ? error.error.message : 'Oops algo ha pasado!';

    switch (error.status) {
      case 0:
        message = 'Error del lado del cliente, si el problema persiste contacte con el técnico';
        break;
      case 401:
        message = 'Usuario ó contraseña no valido';
        break;
      case 500:
        message = '500 Internal Server Error';
        break;
      default:
        message = `Error code ${error.status}`;
        break;
    }

    Alert.error(title, {
      text: message,
      icon: 'error',
    });

    console.error(`Erro devuelto code ${error.status}, response: `, error.error);

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
