import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardSetLimitPage } from './card-set-limit.page';

const routes: Routes = [
  {
    path: '',
    component: CardSetLimitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardSetLimitPageRoutingModule {}
