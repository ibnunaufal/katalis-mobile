import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Last30MutationPageRoutingModule } from './last30-mutation-routing.module';

import { Last30MutationPage } from './last30-mutation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Last30MutationPageRoutingModule,
    TranslateModule
  ],
  declarations: [Last30MutationPage]
})
export class Last30MutationPageModule { }
