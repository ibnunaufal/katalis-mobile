import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BroadcastDetailPage } from './broadcast-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BroadcastDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BroadcastDetailPageRoutingModule {}
