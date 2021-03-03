import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportAppPageRoutingModule } from './support-app-routing.module';

import { SupportAppPage } from './support-app.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportAppPageRoutingModule,
    TranslateModule
  ],
  declarations: [SupportAppPage]
})
export class SupportAppPageModule { }
