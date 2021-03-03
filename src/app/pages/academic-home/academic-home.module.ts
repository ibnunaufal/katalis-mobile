import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomePageRoutingModule } from './academic-home-routing.module';

import { BottomSheetModule } from "ionic-custom-bottom-sheet";
import { AcademicHomePage } from './academic-home.page';
import { TimeagoModule } from 'ngx-timeago';
import { TranslateModule } from '@ngx-translate/core';
// import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomSheetModule,
    // IonicImageLoader,
    TimeagoModule,
    TranslateModule,
    AcademicHomePageRoutingModule,
  ],
  declarations: [AcademicHomePage]
})
export class AcademicHomePageModule { }
