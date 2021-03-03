import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeEditQuestionPage } from './academic-home-edit-question.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeEditQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeEditQuestionPageRoutingModule {}
