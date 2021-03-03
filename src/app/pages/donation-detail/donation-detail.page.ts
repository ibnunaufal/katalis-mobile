import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, NavParams, NavController, IonInput } from "@ionic/angular";

import { Storage } from "@ionic/storage";
import { ReplacePipe } from 'src/app/pipes/replace.pipe';
import { AlertService } from "src/app/services/alert.service";
import { DonationService } from 'src/app/services/donation.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.page.html',
  styleUrls: ['./donation-detail.page.scss'],
  providers: [CurrencyPipe]
})
export class DonationDetailPage implements OnInit {

  @ViewChild('autofocus', { static: false }) ionInput: IonInput;
  donation: any;
  profile: any;
  accountId: any;
  callerId: any;
  donationAmount = "";

  temp_nominal = 0;
  nominal = "";
  donationName;
  history:any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loading: LoadingService,
    private navCtrl: NavController,
    private currencyPipe: CurrencyPipe,
    private alert: AlertService,
    public alertCtrl: AlertController,
    private storage: Storage,
    private donationService: DonationService) {

    this.donation = this.navParams.get("donation");
    this.donationName = this.donation.title;
    this.getHistory();
  }

  ngOnInit() {

  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter() {
    this.setFocusOnInput()
  }

  setFocusOnInput() {
    this.ionInput.setFocus();
  }


  async ADD_DONATION() {

    if (!this.nominal) {
      this.alert.toastError("Amount is required.");
    } else {
      this.loading.show
      this.storage.get('profile').then((profile: any) => {
        this.accountId = profile.accounts[0].id
        this.callerId = profile.accounts[0].callerIdentities[0].callerId
        this.donationService.ADD_DONATION(this.accountId, this.donation.id, this.temp_nominal, this.callerId).then(
          (res: any) => {
            this.loading.hide
            this.alert.popoverSuccess("Transaksi Berhasil", "Donasi untuk " + this.donation.title + " sebesar " + this.getCurrency(this.temp_nominal) + " telah berhasil dilakukan.")

            this.dismiss()
          },
          (error: any) => {
            this.loading.hide
            this.alert.alert(error.split('Message:').pop());
          }
        );
      });
    }
  }

  getHistory(){
    this.donationService.getHistory(this.donation.id).then((res:any)=>{
      this.history = res.body.participants;
      console.log(this.history);
    })
  }

  onChangePrice(evt) {

    this.temp_nominal = evt.replace(/[^0-9.]/g, "");

    this.nominal = this.getCurrency(Number(this.temp_nominal))

    console.log("box_price_formatted: " + Number(this.temp_nominal));
  }


  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'IDR', 'Rp ', '1.0-0');
  }
}

