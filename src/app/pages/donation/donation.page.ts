import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { CurrencyPipe } from "@angular/common";
import { Storage } from "@ionic/storage";
import { ReplacePipe } from "src/app/pipes/replace.pipe";
import { AlertService } from "src/app/services/alert.service";
import { DonationDetailPage } from "../donation-detail/donation-detail.page";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
  providers: [CurrencyPipe, ReplacePipe],
})
export class DonationPage implements OnInit {
  donations;
  start = 0;
  limit = 5;
  donatiosLoaded = false;
  donationsError = false;
  loadingComplete = false;

  constructor(
    private donation: DonationService,
    private modalCtrl: ModalController,
    private loading: LoadingService,

  ) {
    this.GET_DATA();

  }

  ngOnInit() {
  }

  GET_DATA() {
    this.loading.show()
    this.donations = [];
    this.donation.GET_ALL_DONATION()
      .then((donations: any) => {
        this.loading.hide()
        this.donations = donations.body.content;

      }, error => {
        this.loading.hide()

      })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async POPUP_FORM_DONATION(donation) {
    const modal = await this.modalCtrl.create({
      component: DonationDetailPage,
      componentProps: {
        donation: donation,
      },
    });

    await modal.present();
  }

}
