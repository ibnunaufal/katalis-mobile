import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChangePasswordPageRoutingModule } from "./change-password-routing.module";
import { TranslateModule } from '@ngx-translate/core';

// import { ChangePasswordPage } from "./change-password.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    TranslateModule
  ],
  declarations: [],
})
export class ChangePasswordPageModule { }
