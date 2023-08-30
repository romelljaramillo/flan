import {  Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertForm]',
})
export class InsertFormDirective {
  constructor(public viewContainerRef: ViewContainerRef){}
}
