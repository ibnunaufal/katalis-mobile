import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeUploadPageRoutingModule } from './academic-home-upload-routing.module';

// import { AcademicHomeUploadPage } from './academic-home-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicHomeUploadPageRoutingModule
  ],
  // declarations: [AcademicHomeUploadPage]
})
export class AcademicHomeUploadPageModule { }
