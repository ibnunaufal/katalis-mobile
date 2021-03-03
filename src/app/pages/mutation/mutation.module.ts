import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MutationPageRoutingModule } from './mutation-routing.module';

import { MutationPage } from './mutation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MutationPageRoutingModule,
    TranslateModule
  ],
  declarations: [MutationPage]
})
export class MutationPageModule { }
