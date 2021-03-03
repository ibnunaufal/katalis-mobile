import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartAccessPageRoutingModule } from './smart-access-routing.module';

import { SmartAccessPage } from './smart-access.page';
import { TranslateModule } from '@ngx-translate/core';

import { BottomSheetModule } from 'ionic-custom-bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BottomSheetModule,
    SmartAccessPageRoutingModule
  ],
  declarations: [SmartAccessPage]
})
export class SmartAccessPageModule { }
