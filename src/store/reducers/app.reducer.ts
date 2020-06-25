import { IAppState } from '../types';
import { Actions } from '../actions';
import { Currency } from 'src/app/models/currency.enum';

export const initialAppState: IAppState = {
  mobileNavbar: false,
  currency: Currency.ILS,
  currencyRates: {
    ILS: 0,
    USD: 0,
    EUR: 0,
  },
};

export function appReducer(state: IAppState = initialAppState, action: any) {
  switch (action.type) {
    case Actions.SetMobileNavbar:
      return {
        ...state,
        mobileNavbar: action.payload,
      };
    case Actions.SetCurrency:
      return {
        ...state,
        currency: action.payload,
      };
    case Actions.SetCurrencyRates:
      return {
        ...state,
        currencyRates: action.payload,
      };
  }

  return state;
}
