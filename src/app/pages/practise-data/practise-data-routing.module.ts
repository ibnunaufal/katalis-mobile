import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PractiseDataPage } from './practise-data.page';

const routes: Routes = [
  {
    path: '',
    component: PractiseDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PractiseDataPageRoutingModule {}
