import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';
import { CurrencyMenuComponent } from './currency-menu/currency-menu.component';

@NgModule({
  declarations: [NavbarComponent, HeaderComponent, MobileNavbarComponent, CurrencyMenuComponent],
  exports: [NavbarComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
})
export class LayoutModule {}
