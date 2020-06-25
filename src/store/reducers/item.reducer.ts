import { IItemState } from '../types';
import { Actions } from '../actions';
import { Item } from 'src/app/models/item.model';

export const initialItemState: IItemState = {
  itemsOrdered: 0,
  itemsReceived: 0,
  items: [],
  // received: [],
};

export function itemReducer(state: IItemState = initialItemState, action: any) {
  switch (action.type) {
    case Actions.AddItem:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case Actions.ReceiveItem:
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? { ...item, received: true } : item)),
      };
  }

  return state;
}
