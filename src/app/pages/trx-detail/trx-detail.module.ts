import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrxDetailPageRoutingModule } from './trx-detail-routing.module';

import { TrxDetailPage } from './trx-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrxDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [TrxDetailPage]
})
export class TrxDetailPageModule { }
