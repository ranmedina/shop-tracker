import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Currency } from 'src/app/models/currency.enum';
import { appStore } from 'src/store/app.store';
import { MatRadioChange } from '@angular/material/radio';
import { AppActions } from 'src/store/actions/app.actions';

@Component({
  selector: 'currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrencyMenuComponent implements OnInit {
  public readonly Currency = Currency;

  public objectKeys = Object.keys;

  constructor(private appActions: AppActions) {}

  ngOnInit(): void {}

  get userCurrency(): Currency {
    return appStore.getState().app.currency;
  }

  public onCurrencyChanged(event: MatRadioChange): void {
    appStore.dispatch(this.appActions.setCurrency(event.value));
  }
}
