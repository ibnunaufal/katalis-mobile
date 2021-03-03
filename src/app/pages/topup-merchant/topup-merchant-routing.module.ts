import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupMerchantPage } from './topup-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: TopupMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupMerchantPageRoutingModule {}
