import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupMerchantDetailPage } from './topup-merchant-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TopupMerchantDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupMerchantDetailPageRoutingModule {}
