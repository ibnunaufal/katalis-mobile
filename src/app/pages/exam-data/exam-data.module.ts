import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamDataPageRoutingModule } from './exam-data-routing.module';

import { ExamDataPage } from './exam-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamDataPageRoutingModule
  ],
  declarations: [ExamDataPage]
})
export class ExamDataPageModule {}
