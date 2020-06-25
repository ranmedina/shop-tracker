import { Injectable } from '@angular/core';
import { Actions } from '../actions';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemActions {
  constructor() {}

  public addItem(item: Item) {
    return {
      type: Actions.AddItem,
      payload: item,
    };
  }

  public receiveItem(item: Item) {
    return {
      type: Actions.ReceiveItem,
      payload: item,
    };
  }
}
