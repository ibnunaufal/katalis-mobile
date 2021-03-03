import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicHomeUploadPage } from './academic-home-upload.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicHomeUploadPageRoutingModule {}
