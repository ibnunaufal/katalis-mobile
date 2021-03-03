import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeEditQuestionPageRoutingModule } from './academic-home-edit-question-routing.module';

// import { AcademicHomeEditQuestionPage } from './academic-home-edit-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicHomeEditQuestionPageRoutingModule
  ],
  // declarations: [AcademicHomeEditQuestionPage]
})
export class AcademicHomeEditQuestionPageModule { }
