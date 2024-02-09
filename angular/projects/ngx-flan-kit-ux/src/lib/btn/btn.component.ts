import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color } from '../../interfaces/types.interface';
import { CoreComponent } from '../core/core.component';

@Component({
  selector: 'rjb-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(expand === 'block') {
    <div class="d-grid gap-2">
      <button type="button" (click)="onClick.emit($event)" [ngClass]="classes" [disabled]="disabled" [attr.arial-disabled]="disabled ? 'true' : 'false'">
        <i [ngClass]="onIcon"></i>
        {{ label }}
      </button>
      </div>
    } @else {
      <button type="button" (click)="onClick.emit($event)" [ngClass]="classes" [disabled]="disabled" [attr.arial-disabled]="disabled ? 'true' : 'false'">
        <i [ngClass]="onIcon"></i>
        {{ label }}
      </button>
    }
  `,
  styleUrl: './btn.component.css',
})
export class BtnComponent extends CoreComponent {

  @Input()
  type: Color = 'primary';

  @Input()
  outline: boolean = false;

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  @Input()
  label = 'Button';

  @Input()
  icon = 'coffee';

  @Input()
  disabled = false;

  @Input()
  expand = '';

  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    let btnType: string = `btn-${this.type}`;
    let size = '';
    let css = '';
    let disabled = '';

    if (this.outline) {
      btnType = `btn-outline-${this.type}`;
    }

    if (this.size) {
      size = `btn-${this.size}`;
    }

    if (this.css) {
      css = `${this.css}`;
    }

    if (this.disabled) {
      disabled = `disabled`;
    }

    return ['btn', btnType, size, css, disabled];

  }

  public get onIcon(): string {
    return `fa fa-${this.icon}`;
  }
}
