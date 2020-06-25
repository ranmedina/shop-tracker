import { Component, OnInit } from '@angular/core';
import { appStore } from 'src/store/app.store';
import { AppActions } from 'src/store/actions/app.actions';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public navStatus: boolean = false;

  constructor(private appActions: AppActions) {}

  ngOnInit(): void {}

  get navbarStatus(): boolean {
    return appStore.getState().app.mobileNavbar;
  }

  public toggleNavbar(): void {
    appStore.dispatch(this.appActions.setMobileNavbar(!appStore.getState().app.mobileNavbar));
  }
}
