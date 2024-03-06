import { Directive, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hasAnyPermission]'
})
export class HasAnyPermission implements OnDestroy {

  @Input('hasAnyPermission') hasAnyPermission?: string[];
  private sub?: Subscription;
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}