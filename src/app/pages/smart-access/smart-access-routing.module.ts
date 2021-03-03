import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartAccessPage } from './smart-access.page';

const routes: Routes = [
  {
    path: '',
    component: SmartAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartAccessPageRoutingModule {}
