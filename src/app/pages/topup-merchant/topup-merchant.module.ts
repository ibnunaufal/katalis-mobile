import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupMerchantPageRoutingModule } from './topup-merchant-routing.module';
import { RouterModule } from '@angular/router';
import { TopupMerchantPage } from './topup-merchant.page';
// import { SharedComponetsModule } from '../../components/shared-componets.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupMerchantPageRoutingModule, RouterModule.forChild([
      {
        path: '',
        component: TopupMerchantPage
      }
    ]),
    // SharedComponetsModule,
  ],
  // declarations: [TopupMerchantPage],

})
export class TopupMerchantPageModule { }
