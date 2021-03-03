import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddPageRoutingModule } from './academic-home-add-routing.module';

// import { AcademicHomeAddPage } from './academic-home-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AcademicHomeAddPageRoutingModule
  ],
  // declarations: [AcademicHomeAddPage]
})
export class AcademicHomeAddPageModule { }
