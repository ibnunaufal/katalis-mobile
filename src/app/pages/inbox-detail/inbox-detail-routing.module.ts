import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxDetailPage } from './inbox-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InboxDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxDetailPageRoutingModule {}
