import { Injectable } from '@angular/core';
import { Actions } from '../actions';
import { Currency } from 'src/app/models/currency.enum';

@Injectable({
  providedIn: 'root',
})
export class AppActions {
  constructor() {}

  public setMobileNavbar(status: boolean) {
    return {
      type: Actions.SetMobileNavbar,
      payload: status,
    };
  }

  public setCurrency(currency: Currency) {
    return {
      type: Actions.SetCurrency,
      payload: currency,
    };
  }

  public setCurrencyRates(rates: { [currency: string]: number }) {
    return {
      type: Actions.SetCurrencyRates,
      payload: rates,
    };
  }
}
