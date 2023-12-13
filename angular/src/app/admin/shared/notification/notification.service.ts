import { Injectable } from '@angular/core';

import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  private Confirm = Swal.mixin({
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0069d9',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Eliminar',
  });

  toast(options?: SweetAlertOptions) {
    this.Toast.fire({ ...options });
  }

  confirm(message: string, options?: SweetAlertOptions) {
    return this.Confirm.fire({ ...options, title: message })
    .then((result) => result.isConfirmed);
  }

  success(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#d4edda',
      color: '#155724',
      icon: 'success',
    });
  }

  error(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#f8d7da',
      color: '#721c24',
      icon: 'error',
    });
  }

  info(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#d1ecf1',
      color: '#0c5460',
      icon: 'info',
    });
  }

  warn(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#fff3cd',
      color: '#856404',
      icon: 'warning',
    });
  }
}


