import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePageRoutingModule } from './attendance-routing.module';

import { AttendancePage } from './attendance.page';
import { TranslateModule } from '@ngx-translate/core';
import { BottomSheetModule } from 'ionic-custom-bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule,
    TranslateModule,
    BottomSheetModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule { }
