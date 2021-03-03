import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupMerchantDetailPageRoutingModule } from './topup-merchant-detail-routing.module';

import { TopupMerchantDetailPage } from './topup-merchant-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupMerchantDetailPageRoutingModule
  ],
  // declarations: [TopupMerchantDetailPage]
})
export class TopupMerchantDetailPageModule { }
