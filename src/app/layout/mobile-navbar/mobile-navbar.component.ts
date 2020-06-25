import { Component, OnInit } from '@angular/core';
import { appStore } from 'src/store/app.store';

@Component({
  selector: 'mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  public navStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get navbarStatus(): boolean {
    return appStore.getState().app.mobileNavbar;
  }
}
