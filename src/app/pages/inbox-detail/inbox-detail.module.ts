import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxDetailPageRoutingModule } from './inbox-detail-routing.module';

// import { InboxDetailPage } from './inbox-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxDetailPageRoutingModule
  ],
  declarations: []
})
export class InboxDetailPageModule { }
