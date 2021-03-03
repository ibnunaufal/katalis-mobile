import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordOtpPageRoutingModule } from './forget-password-otp-routing.module';

import { ForgetPasswordOtpPage } from './forget-password-otp.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ForgetPasswordOtpPageRoutingModule
  ],
  declarations: [ForgetPasswordOtpPage]
})
export class ForgetPasswordOtpPageModule { }
