import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationPageRoutingModule } from './donation-routing.module';

import { DonationPage } from './donation.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DonationPageRoutingModule
  ],
  declarations: [DonationPage]
})
export class DonationPageModule { }
