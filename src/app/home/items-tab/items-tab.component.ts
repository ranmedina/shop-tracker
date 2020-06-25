import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { appStore } from 'src/store/app.store';
import { MatSort } from '@angular/material/sort';
import { ItemActions } from 'src/store/actions/item.actions';
import { Currency } from 'src/app/models/currency.enum';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'items-tab',
  templateUrl: './items-tab.component.html',
  styleUrls: ['./items-tab.component.scss'],
})
export class ItemsTabComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public isPurchasedPage: boolean = this.router.url === '/list' || this.router.url === '/';
  public desktopColumns = ['id', 'name', 'store', 'price', 'arrivalDate'];
  public mobileColumns = ['id', 'item'];

  public dataSource = new MatTableDataSource(
    appStore
      .getState()
      .item.items.filter((e) => e.received !== this.isPurchasedPage)
      .sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime())
  );

  constructor(private dialog: MatDialog, private itemActions: ItemActions, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    if (this.isPurchasedPage) {
      // Received button should only appear on Purchased page
      this.desktopColumns.push('action');
      this.mobileColumns.push('action');
    }

    // Instead of using a getter, update dataSource just when state is updated
    appStore.subscribe(() => {
      this.dataSource.data = appStore.getState().item.items;
    });
  }

  get userCurrency() {
    return appStore.getState().app.currency;
  }

  public markAsReceived(item: Item) {
    appStore.dispatch(this.itemActions.receiveItem(item));
  }

  public openNewItemDialog(): void {
    const dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '90%',
      maxWidth: '450px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      const { name, store, price, arrivalDate } = data,
        itemid = appStore.getState().item.items.length,
        { currencyRates } = appStore.getState().app;

      // App uses EUR as base currency, therefore price will be converted to EUR, currency pipe will do the rest
      const exchangedPrice =
        price.value /
        (this.userCurrency === Currency.ILS ? currencyRates.ILS / currencyRates.EUR : currencyRates.USD / currencyRates.EUR);

      appStore.dispatch(
        this.itemActions.addItem({
          id: itemid,
          name: name.value,
          store: store.value,
          price: exchangedPrice,
          arrivalDate: new Date(arrivalDate.value),
          received: false,
        })
      );
    });
  }
}
