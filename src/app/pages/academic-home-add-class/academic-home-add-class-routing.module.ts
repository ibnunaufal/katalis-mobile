import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeAddClassPage } from './academic-home-add-class.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeAddClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeAddClassPageRoutingModule {}
