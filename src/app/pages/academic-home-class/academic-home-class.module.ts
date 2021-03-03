import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeClassPageRoutingModule } from './academic-home-class-routing.module';

import { BottomSheetModule } from "ionic-custom-bottom-sheet";
// import { AcademicHomeClassPage } from './academic-home-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, BottomSheetModule,
    IonicModule,
    AcademicHomeClassPageRoutingModule
  ],
  // declarations: [AcademicHomeClassPage]
})
export class AcademicHomeClassPageModule { }
