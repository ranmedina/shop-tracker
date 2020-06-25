import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { appStore } from 'src/store/app.store';
import { Currency } from 'src/app/models/currency.enum';
import { mockItems } from '../../../mock-items';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.scss'],
})
export class NewItemDialogComponent implements OnInit {
  public readonly Currency = Currency;

  public itemForm: FormGroup;
  public matErrorMessage: { [control: string]: string } = {};
  public minDate = new Date(new Date().setDate(new Date().getDate() + 1));

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewItemDialogComponent>) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: [null, Validators.required],
      store: [null, Validators.required],
      price: [null, Validators.required],
      arrivalDate: [null, Validators.required],
    });
  }

  get formControls() {
    return this.itemForm.controls;
  }

  get userCurrency(): Currency {
    return appStore.getState().app.currency;
  }

  public generateData(): void {
    const rand = Math.round(mockItems.length * Math.random() + 1);
    const { name, store, price } = mockItems[rand];
    this.formControls.name.setValue(name);
    this.formControls.store.setValue(store);
    this.formControls.price.setValue(price);
    this.formControls.arrivalDate.setValue(
      new Date(new Date().setDate(new Date().getDate() + Math.round(Math.random() * 10 + 1) + 1))
    );
  }

  private parseErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return 'This field is required';
    }

    return 'Invalid field';
  }

  public submit(): void {
    if (this.itemForm.invalid) {
      Object.keys(this.formControls).forEach((key: string) => {
        const control: AbstractControl = this.formControls[key];
        if (control.errors) {
          this.matErrorMessage[key] = this.parseErrorMessage(Object.keys(control.errors)[0]);
          return;
        }
      });
      return;
    }

    this.dialogRef.close(this.formControls);
  }
}
