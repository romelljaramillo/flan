import { Directive, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[isHasRole]'
})
export class HasRoleDirective implements OnDestroy {

  @Input('isHasRole') hasRole?: string[];
  private sub?: Subscription;

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}