import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[hasAnyPermission]'
})
export class HasAnyPermission implements OnInit, OnDestroy {

  @Input('hasAnyPermission') hasAnyPermission?: string[];
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    console.log(this.hasAnyPermission);
    
    // this.sub = this.authService.hasPermission(this.hasAnyPermission)
    //   .pipe(
    //     map((permission) => Boolean(permission)),
    //     distinctUntilChanged(),
    //     tap((hasPermission) =>
    //       hasPermission
    //         ? this.viewContainerRef.createEmbeddedView(this.templateRef)
    //         : this.viewContainerRef.clear()
    //     )
    //   )
    //   .subscribe();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}