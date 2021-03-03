import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrxFilterPage } from './trx-filter.page';

const routes: Routes = [
  {
    path: '',
    component: TrxFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrxFilterPageRoutingModule {}
