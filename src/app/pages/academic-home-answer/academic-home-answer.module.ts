import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeAnswerPageRoutingModule } from './academic-home-answer-routing.module';

// import { AcademicHomeAnswerPage } from './academic-home-answer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AcademicHomeAnswerPageRoutingModule
  ],
  // declarations: [AcademicHomeAnswerPage]
})
export class AcademicHomeAnswerPageModule { }
