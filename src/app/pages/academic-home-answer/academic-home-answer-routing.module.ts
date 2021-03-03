import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeAnswerPage } from './academic-home-answer.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeAnswerPageRoutingModule {}
