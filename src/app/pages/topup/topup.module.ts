import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TopupPageRoutingModule } from "./topup-routing.module";

import { TopupPage } from "./topup.page";
import { PipesModule } from "../../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [TopupPage]
})
export class TopupPageModule { }
