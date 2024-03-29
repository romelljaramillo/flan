import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { CoreComponent } from '../core/core.component';
// import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'rjb-btn-theme-mode',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './btn-theme-mode.component.html',
  styleUrl: './btn-theme-mode.component.css',
})
export class BtnThemeModeComponent extends CoreComponent{
  faMoon = faMoon;
  faSun = faSun;
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  // /**
  //  * What background color to use
  //  */
  // @Input()
  // color: 'primary' |  'secondary' |  'success' |  'info' |  'warning' |  'danger' |  'light' |  'dark' = 'light';
  
  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  isDarkMode = false;
  themeClasses: string | undefined;

  public get classes(): string[] {
    const mode = this.primary
      ? 'storybook-button--primary'
      : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }

  constructor() {
    super();
    this.color = 'light';
    const storedDarkMode = localStorage.getItem('color-theme');
    console.log('storedDarkMode', storedDarkMode);
    if (storedDarkMode !== null) {
      this.isDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('prefersDarkMode', prefersDarkMode);
      this.isDarkMode = prefersDarkMode;
    }

    this.updateBodyClass();
  }

  ngOnInit(): void {
    this.updateBodyClass();
  }

  updateBodyClass() {
    document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');

    if (this.color === 'dark' || this.color === 'light') {
      this.color = this.isDarkMode ? 'dark' : 'light';
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('color-theme', JSON.stringify(this.isDarkMode));
    this.updateBodyClass();
  }
}
