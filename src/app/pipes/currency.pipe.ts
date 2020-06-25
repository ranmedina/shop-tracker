import { Pipe, PipeTransform } from '@angular/core';
import { appStore } from 'src/store/app.store';
import { Currency } from '../models/currency.enum';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const { currency, currencyRates } = appStore.getState().app;

    if (currency === Currency.ILS) {
      const diff = currencyRates.ILS / currencyRates.EUR;
      value *= diff;
      return `${value.toFixed(2)}₪`;
    } else {
      const diff = currencyRates.USD / currencyRates.EUR;
      value *= diff;
      return `$${value.toFixed(2)}`;
    }
  }
}
