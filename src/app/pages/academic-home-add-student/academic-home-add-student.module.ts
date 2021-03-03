import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddStudentPageRoutingModule } from './academic-home-add-student-routing.module';

// import { AcademicHomeAddStudentPage } from './academic-home-add-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicHomeAddStudentPageRoutingModule
  ],
  // declarations: [AcademicHomeAddStudentPage]
})
export class AcademicHomeAddStudentPageModule { }
