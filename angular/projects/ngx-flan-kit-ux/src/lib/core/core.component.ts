import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rjb-core',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p [id]="id" [className]="css">core works!</p>`,
  styleUrl: './core.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent { 

  @Input() css = '';
  @Input() id = '';
}
