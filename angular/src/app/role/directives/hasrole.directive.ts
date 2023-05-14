import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[isHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input('isHasRole') hasRole?: string[];
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    // this.sub = this.authService.hasRole(this.hasRole)
    //   .pipe(
    //     map((role) => Boolean(role)),
    //     distinctUntilChanged(),
    //     tap((hasRole) =>
    //       hasRole
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