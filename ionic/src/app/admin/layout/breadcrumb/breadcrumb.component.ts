import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { IonBreadcrumb, IonBreadcrumbs, IonGrid, IonCol, IonRow, IonContent } from '@ionic/angular/standalone';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [IonContent, IonRow, IonCol, IonGrid, IonBreadcrumb, IonBreadcrumbs]
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
