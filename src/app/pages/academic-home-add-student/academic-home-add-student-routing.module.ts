import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeAddStudentPage } from './academic-home-add-student.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeAddStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeAddStudentPageRoutingModule {}
