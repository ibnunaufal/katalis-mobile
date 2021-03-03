import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeCommentPageRoutingModule } from './academic-home-comment-routing.module';

import { AcademicHomeCommentPage } from './academic-home-comment.page';

import { TimeagoModule } from 'ngx-timeago';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeagoModule,
    AcademicHomeCommentPageRoutingModule
  ],
  declarations: [AcademicHomeCommentPage]
})
export class AcademicHomeCommentPageModule { }
