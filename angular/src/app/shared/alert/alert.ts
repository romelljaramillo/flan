import Swal, { SweetAlertOptions } from 'sweetalert2';

export class Alert {
  static Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  static Confirm = Swal.mixin({
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0069d9',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Eliminar',
  });

  static toast(options?: SweetAlertOptions) {
    this.Toast.fire({ ...options });
  }

  static confirm(message: string, options?: SweetAlertOptions) {
    return this.Confirm.fire({ ...options, title: message });
  }

  // convenience methods
  static success(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#d4edda',
      color: '#155724',
      icon: 'success',
    });
  }

  static error(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#f8d7da',
      color: '#721c24',
      icon: 'error',
    });
  }

  static info(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#d1ecf1',
      color: '#0c5460',
      icon: 'info',
    });
  }

  static warn(message: string, options?: SweetAlertOptions) {
    this.toast({
      ...options,
      title: message,
      background: '#fff3cd',
      color: '#856404',
      icon: 'warning',
    });
  }
}
