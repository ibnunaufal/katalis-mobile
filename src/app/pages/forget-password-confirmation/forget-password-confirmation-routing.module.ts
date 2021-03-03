import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordConfirmationPage } from './forget-password-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPasswordConfirmationPageRoutingModule {}
