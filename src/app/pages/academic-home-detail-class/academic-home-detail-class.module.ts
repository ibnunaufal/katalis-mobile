import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeDetailClassPageRoutingModule } from './academic-home-detail-class-routing.module';

// import { AcademicHomeDetailClassPage } from './academic-home-detail-class.page';
import { TranslateModule } from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TimeagoModule,
    IonicModule,
    AcademicHomeDetailClassPageRoutingModule
  ],
  // declarations: [AcademicHomeDetailClassPage]
})
export class AcademicHomeDetailClassPageModule { }
