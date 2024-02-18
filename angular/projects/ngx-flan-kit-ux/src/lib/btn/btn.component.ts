import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreComponent } from '../core/core.component';
import { DynamicAttrsDirective } from '../core/dynamic-attrs.directive';

@Component({
  selector: 'rjb-btn',
  standalone: true,
  imports: [CommonModule, DynamicAttrsDirective],
  template: `
    @if(block) {
    <div class="d-grid gap-2">
      <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
    </div>
    } @else {
    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
    }
    <ng-template #buttonTemplate>
      <button [attr.id]="id || null" [attr.type]="type || null"
        [ngClass]="classes"
        (click)="onClick.emit($event)"
        [disabled]="disabled"
        [dynamicAttrs]="additionalAttributes"
      >
        @if(icon) {
          <i [ngClass]="onIcon"></i>
        }
        {{ label }}
        <ng-content></ng-content>
      </button>
    </ng-template>
  `,
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent extends CoreComponent {
  @Input() outline = false;
  @Input() size!: 'sm' | 'md' | 'lg';
  @Input() type!: 'button' | 'submit' | 'reset';
  @Input() label!: string;
  @Input() disabled = false;
  @Input() block = false;
  @Output() onClick = new EventEmitter<Event>();

  get classes(): string[] {
    let btnType = '';

    if (this.color) {
      btnType = this.outline
        ? `btn btn-outline-${this.color}`
        : `btn btn-${this.color}`;
    }

    const sizeClass = (this.size) ? `btn-${this.size}` : '';
    
    return [btnType, sizeClass, this.textColor, this.css, this.disabled ? 'disabled' : ''].filter(
      Boolean
    );
  }
}
