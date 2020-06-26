import { Component, OnInit } from '@angular/core';
import { appStore } from 'src/store/app.store';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'stores-tab',
  templateUrl: './stores-tab.component.html',
  styleUrls: ['./stores-tab.component.scss'],
})
export class StoresTabComponent implements OnInit {
  public panelOpenState = false;
  public reducedData: { [store: string]: { openState: boolean; items: Item[] } };
  public today = new Date();
  public objectKeys = Object.keys;
  public isPurchasedPage = this.router.url === '/list' || this.router.url === '/';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.reducedData = appStore
      .getState()
      .item.items.filter((i) => i.received !== this.isPurchasedPage)
      .reduce(function (acc, self) {
        const key = self['store'];
        acc[key] ? acc[key].items.push(self) : (acc[key] = { openState: false, items: [self] });
        return acc;
      }, {});
  }

  get userCurrency() {
    return appStore.getState().app.currency;
  }

  public getDateInfo(item: Item): { icon: string; text: string } {
    if (item.received) {
      return {
        icon: 'done',
        text: 'arrived',
      };
    }

    if (new Date() > item.arrivalDate) {
      return {
        icon: 'warning',
        text: 'was supposed to arrive',
      };
    }

    return {
      icon: 'hourglass_empty',
      text: 'will arrive',
    };
  }
}
