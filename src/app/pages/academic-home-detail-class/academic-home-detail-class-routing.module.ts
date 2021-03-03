import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeDetailClassPage } from './academic-home-detail-class.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeDetailClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeDetailClassPageRoutingModule {}
