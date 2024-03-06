import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarRightService {
  private componenteActivoSource = new BehaviorSubject<string>('');

  componenteActivo = this.componenteActivoSource.asObservable();

  cambiarComponente(componente: string) {
    this.componenteActivoSource.next(componente);
  }
}