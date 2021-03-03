import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeCommentPage } from './academic-home-comment.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeCommentPageRoutingModule {}
