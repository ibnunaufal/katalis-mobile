import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanqrPageRoutingModule } from './scanqr-routing.module';

import { ScanqrPage } from './scanqr.page';

import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ScanqrPageRoutingModule
  ],
  declarations: [ScanqrPage]
})
export class ScanqrPageModule { }
