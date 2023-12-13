import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  styles: [''],
  template: `
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ title }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">Home</a>
              </li>
              <li class="breadcrumb-item active">{{ title }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbComponent implements OnDestroy {
  public title?: string;
  public titleSubs$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.titleSubs$ = this.getArgumentosRuta().subscribe(({ title }) => {
      this.title = title;
      document.title = `Admin - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
