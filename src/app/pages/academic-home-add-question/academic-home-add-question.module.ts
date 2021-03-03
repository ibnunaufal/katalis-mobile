import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddQuestionPageRoutingModule } from './academic-home-add-question-routing.module';

// import { AcademicHomeAddQuestionPage } from './academic-home-add-question.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AcademicHomeAddQuestionPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // declarations: [AcademicHomeAddQuestionPage]
})
export class AcademicHomeAddQuestionPageModule { }
