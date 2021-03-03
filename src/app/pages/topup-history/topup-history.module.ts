import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupHistoryPageRoutingModule } from './topup-history-routing.module';

import { PipesModule } from "src/app/pipes/pipes.module";
// import { TopupHistoryPage } from './topup-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupHistoryPageRoutingModule, PipesModule
  ],
  declarations: []
})
export class TopupHistoryPageModule { }
