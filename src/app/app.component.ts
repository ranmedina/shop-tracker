import { Component, OnInit, EventEmitter } from '@angular/core';
import { of, interval } from 'rxjs';
import { catchError, flatMap, startWith } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { appStore } from 'src/store/app.store';
import { AppActions } from 'src/store/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly apiEndpoint = 'https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,ILS,EUR';
  private readonly INTERVAL_SECONDS = 10;

  public httpEvent$ = new EventEmitter();

  constructor(private http: HttpClient, private appActions: AppActions) {}

  ngOnInit(): void {
    interval(this.INTERVAL_SECONDS * 1000)
      .pipe(
        startWith(0),
        flatMap(() => this.http.get(this.apiEndpoint)),
        catchError((e) => {
          console.error(e);
          return of(e);
        })
      )
      .subscribe((e) => {
        if (e instanceof HttpErrorResponse) {
          console.log('HttpErrorResponse');
          appStore.dispatch(this.appActions.setCurrencyRates({ ILS: -1, USD: -1, EUR: -1 }));

          return;
        }

        appStore.dispatch(this.appActions.setCurrencyRates(e.rates));
      });
  }

  get isError() {
    return appStore.getState().app.currencyRates.ILS === -1;
  }
}
