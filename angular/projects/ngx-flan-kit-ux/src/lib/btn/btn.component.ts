import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreComponent } from '../core/core.component';

@Component({
  selector: 'rjb-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(block) {
      <div class="d-grid gap-2">
        <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
      </div>
    } @else {
      <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
    }
    <ng-template #buttonTemplate>
      <button [ngClass]="classes" (click)="onClick.emit($event)" [disabled]="disabled">
        <i *ngIf="icon" [ngClass]="onIcon"></i>
        {{ label }}
        <ng-content></ng-content>
      </button>
    </ng-template>
  `,
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent extends CoreComponent {
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  @Input() outline = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label = '';
  /**
   * the icon is from the fontawesome lib and the format should be only the name part of the icon for example: fa fa-[icon-name]
   */
  @Input() icon = '';
  @Input() disabled = false;
  @Input() block = false;
  @Output() onClick = new EventEmitter<Event>();

  get classes(): string[] {
    const btnType = this.outline ? `btn-outline-${this.type}` : `btn-${this.type}`;
    const sizeClass = `btn-${this.size}`;
    return ['btn', btnType, sizeClass, this.disabled ? 'disabled' : ''].filter(Boolean);
  }

  get onIcon(): string {
    return `fa fa-${this.icon}`;
  }
}
