import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Last30MutationPage } from './last30-mutation.page';

const routes: Routes = [
  {
    path: '',
    component: Last30MutationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Last30MutationPageRoutingModule {}
