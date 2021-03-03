import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlderMutationPage } from './older-mutation.page';

const routes: Routes = [
  {
    path: '',
    component: OlderMutationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlderMutationPageRoutingModule {}
