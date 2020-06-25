import { Currency } from 'src/app/models/currency.enum';
import { Item } from 'src/app/models/item.model';

export interface IAppState {
  mobileNavbar: boolean;
  currency: Currency;
  currencyRates: { [currency: string]: number };
}

export interface IItemState {
  itemsOrdered: number;
  itemsReceived: number;
  items: Item[];
}
