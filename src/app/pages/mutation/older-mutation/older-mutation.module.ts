import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlderMutationPageRoutingModule } from './older-mutation-routing.module';

import { OlderMutationPage } from './older-mutation.page';

import { BottomSheetModule } from "ionic-custom-bottom-sheet";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomSheetModule,
    TranslateModule,
    OlderMutationPageRoutingModule
  ],
  declarations: [OlderMutationPage]
})
export class OlderMutationPageModule { }
