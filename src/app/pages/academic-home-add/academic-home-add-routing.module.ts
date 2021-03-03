import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeAddPage } from './academic-home-add.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeAddPageRoutingModule {}
