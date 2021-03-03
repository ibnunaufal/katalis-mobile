import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceSummaryDetailPageRoutingModule } from './invoice-summary-detail-routing.module';

import { InvoiceSummaryDetailPage } from './invoice-summary-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceSummaryDetailPageRoutingModule
  ],
  declarations: [InvoiceSummaryDetailPage]
})
export class InvoiceSummaryDetailPageModule {}
