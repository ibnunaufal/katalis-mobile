import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupHistoryPage } from './topup-history.page';

const routes: Routes = [
  {
    path: '',
    component: TopupHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupHistoryPageRoutingModule {}
