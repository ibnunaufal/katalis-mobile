import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PractiseDataPageRoutingModule } from './practise-data-routing.module';

import { PractiseDataPage } from './practise-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PractiseDataPageRoutingModule
  ],
  declarations: [PractiseDataPage]
})
export class PractiseDataPageModule {}
