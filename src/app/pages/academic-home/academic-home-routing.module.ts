import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomePage } from './academic-home.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomePageRoutingModule {}
