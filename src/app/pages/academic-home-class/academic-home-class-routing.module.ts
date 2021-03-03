import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeClassPage } from './academic-home-class.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeClassPageRoutingModule {}
