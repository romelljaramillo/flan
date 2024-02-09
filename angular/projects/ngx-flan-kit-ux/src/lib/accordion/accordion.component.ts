import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

export interface Item {
  title?: string | undefined;
  content: string;
}

@Component({
  selector: 'rjb-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
})
export class AccordionComponent implements OnInit {
  
  /**
   * items to display in the accordion
   */
  @Input() items: Item[] = [];

  /**
   * @description id for the accordion
   */
  @Input() id: string = 'rjaccordion';

  /**
   * Active item index expanded by default undefined value (starts at 0 to n-items)
   */
  @Input() showItem: number | null = null;

  /**
   * Show all items expanded by default false value
   */
  @Input() showAll: boolean = false;

  ngOnInit(): void {
    if (this.showAll) {
      this.showItem = null;
    }
  }
}
