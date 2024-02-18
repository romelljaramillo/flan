import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamicAttrs]',
  standalone: true
})
export class DynamicAttrsDirective implements OnInit {
  @Input() dynamicAttrs!: { [key: string]: string; };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    Object.keys(this.dynamicAttrs).forEach(attr => {
      this.renderer.setAttribute(this.el.nativeElement, attr, this.dynamicAttrs[attr]);
    });
  }
}
