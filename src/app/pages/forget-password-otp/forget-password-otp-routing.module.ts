import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordOtpPage } from './forget-password-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPasswordOtpPageRoutingModule {}
