import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  //https://ionicframework.com/docs/v8/api/toast#interfaces

  constructor(private toastController: ToastController) {}

  async toast(message: string, options?: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: options && options.duration ? options.duration : 3000,
      position: options && options.position ? options.position : 'top',
      color: options && options.color ? options.color : 'dark',
      cssClass: options && options.cssClass ? options.cssClass : '',
      buttons: options && options.buttons ? options.buttons : null
    });
    toast.present();
  }

  async confirm(message: string, options?: any) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      color: 'warning',
      buttons: [
        {
          text: options && options.cancelButtonText ? options.cancelButtonText : 'Cancelar',
          role: 'cancel',
          handler: () => {
            if (options && options.onCancel) {
              options.onCancel();
            }
          }
        },
        {
          text: options && options.confirmButtonText ? options.confirmButtonText : 'Eliminar',
          handler: () => {
            if (options && options.onConfirm) {
              options.onConfirm();
            }
          }
        }
      ]
    });
    toast.present();
  }

  async success(message: string, options?: any) {
    await this.toast(message, { ...options, color: 'success' });
  }

  async error(message: string, options?: any) {
    await this.toast(message, { ...options, color: 'danger' });
  }

  async info(message: string, options?: any) {
    await this.toast(message, { ...options, color: 'primary' });
  }

  async warn(message: string, options?: any) {
    await this.toast(message, { ...options, color: 'warning' });
  }
}
