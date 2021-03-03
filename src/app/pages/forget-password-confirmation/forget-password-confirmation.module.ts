import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordConfirmationPageRoutingModule } from './forget-password-confirmation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ForgetPasswordConfirmationPage } from './forget-password-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgetPasswordConfirmationPageRoutingModule
  ],
  declarations: [ForgetPasswordConfirmationPage]
})
export class ForgetPasswordConfirmationPageModule { }
