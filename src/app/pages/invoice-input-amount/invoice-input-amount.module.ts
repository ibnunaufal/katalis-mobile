import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceInputAmountPageRoutingModule } from './invoice-input-amount-routing.module';

import { InvoiceInputAmountPage } from './invoice-input-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceInputAmountPageRoutingModule
  ],
  // declarations: [InvoiceInputAmountPage]
})
export class InvoiceInputAmountPageModule { }
