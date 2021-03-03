import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { InvoicePageRoutingModule } from "./invoice-routing.module";

import { InvoicePage } from "./invoice.page";
import { PipesModule } from "src/app/pipes/pipes.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [InvoicePage],
})
export class InvoicePageModule { }
