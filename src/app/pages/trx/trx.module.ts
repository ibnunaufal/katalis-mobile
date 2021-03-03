import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrxPageRoutingModule } from './trx-routing.module';
import { BottomSheetModule } from "ionic-custom-bottom-sheet";
import { TrxPage } from './trx.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrxPageRoutingModule,
    BottomSheetModule,
    TranslateModule
  ],
  declarations: [TrxPage]
})
export class TrxPageModule { }
