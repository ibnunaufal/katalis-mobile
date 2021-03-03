import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrxDetailPage } from './trx-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TrxDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrxDetailPageRoutingModule {}
