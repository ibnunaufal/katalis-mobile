import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrxPage } from './trx.page';

const routes: Routes = [
  {
    path: '',
    component: TrxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrxPageRoutingModule {}
