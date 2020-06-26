import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public pageName: string;
  public routeChanges: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeChanges = this.route.data.subscribe(({ title }) => (this.pageName = title));
  }

  ngOnDestroy(): void {
    this.routeChanges.unsubscribe();
  }
}
