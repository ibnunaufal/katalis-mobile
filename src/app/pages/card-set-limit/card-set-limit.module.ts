import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardSetLimitPageRoutingModule } from './card-set-limit-routing.module';

import { PipesModule } from "src/app/pipes/pipes.module";
import { CardSetLimitPage } from './card-set-limit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardSetLimitPageRoutingModule,
    PipesModule,
  ],
  // declarations: [CardSetLimitPage]
})
export class CardSetLimitPageModule { }
