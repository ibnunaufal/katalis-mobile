import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceInputAmountPage } from './invoice-input-amount.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceInputAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceInputAmountPageRoutingModule {}
