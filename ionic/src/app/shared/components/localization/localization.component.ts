import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LangSelectorComponent } from '@modules/lang/lang-selector/lang-selector.component';

@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [
    CommonModule, LangSelectorComponent
  ],
  templateUrl: './localization.component.html',
  styleUrl: './localization.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizationComponent { }
