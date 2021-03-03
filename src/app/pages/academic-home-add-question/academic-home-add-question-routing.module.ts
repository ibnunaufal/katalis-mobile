import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeAddQuestionPage } from './academic-home-add-question.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeAddQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeAddQuestionPageRoutingModule {}
