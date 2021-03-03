import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddClassPageRoutingModule } from './academic-home-add-class-routing.module';

// import { AcademicHomeAddClassPage } from './academic-home-add-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicHomeAddClassPageRoutingModule
  ],
  // declarations: [AcademicHomeAddClassPage]
})
export class AcademicHomeAddClassPageModule { }
