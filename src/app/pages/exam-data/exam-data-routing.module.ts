import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamDataPage } from './exam-data.page';

const routes: Routes = [
  {
    path: '',
    component: ExamDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamDataPageRoutingModule {}
