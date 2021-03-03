import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceSummaryDetailPage } from './invoice-summary-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceSummaryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceSummaryDetailPageRoutingModule {}
