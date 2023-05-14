import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[viewForm]',
})
export class FormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
