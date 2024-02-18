import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicAttrsDirective } from './dynamic-attrs.directive';

@Component({
  selector: 'rjb-core',
  standalone: true,
  imports: [CommonModule, DynamicAttrsDirective],
  template: `<p
    [attr.id]="id || null"
    [ngClass]="[css, textColor, 'btn btn-' + color]"
  >
    core works!
  </p>`,
  styleUrl: './core.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {
  /**
   * Applies an identifier to the element
   */
  @Input() id!: string;

  /**
   * Applies a custom class to the element example: 'fw-bold'
   */
  @Input() css!: string;

  /**
   * Applies a custom attribute to the element example: 'data-custom="example"'
   */
  @Input() additionalAttributes!: { [key: string]: any };

  /**
   * Bootstrap’s color palette has continued to expand and become more nuanced in v5.3.0.
   * We’ve added new variables for secondary and tertiary text and background colors, plus {color}-bg-subtle,
   * {color}-border-subtle, and {color}-text-emphasis for our theme colors. These new colors are available
   * through Sass and CSS variables (but not our color maps or utility classes) with the express goal of making
   * it easier to customize across multiple colors modes like light and dark. These new variables are globally
   * set on :root and are adapted for our new dark color mode while our original theme colors remain unchanged.
   */
  @Input() color!:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
    | 'link';

  /**
   * Applies a text color to the element
   */
  @Input() textColor!:
    | 'text-primary'
    | 'text-secondary'
    | 'text-success'
    | 'text-info'
    | 'text-warning'
    | 'text-danger'
    | 'text-light'
    | 'text-dark'
    | 'text-link';

  /**
   * the icon is from the fontawesome lib and the format should be only the name part of the icon for example: fa fa-[icon-name]
   * example: 'fa fa-[plus]'
  */
  @Input() icon = '';

  get onIcon(): string {
    return `fa fa-${this.icon}`;
  }

  /* objectKeys(obj?: { [key: string]: any }): string[] {
    return obj ? Object.keys(obj) : [];
  } */
  

}
