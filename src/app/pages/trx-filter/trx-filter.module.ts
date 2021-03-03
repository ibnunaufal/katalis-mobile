import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrxFilterPageRoutingModule } from './trx-filter-routing.module';

import { TrxFilterPage } from './trx-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrxFilterPageRoutingModule
  ],
  declarations: [TrxFilterPage]
})
export class TrxFilterPageModule {}
