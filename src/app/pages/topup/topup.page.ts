import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { LoadingService } from "src/app/services/loading.service";
import { AlertService } from "src/app/services/alert.service";
import { VaService } from "src/app/services/va.service";
import { TopupHistoryPage } from "../topup-history/topup-history.page";
import { Storage } from "@ionic/storage";
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { ToastController } from '@ionic/angular';
import {TopupMerchantPage } from '../../pages/topup-merchant/topup-merchant.page'
import { GlobalObservableService } from 'src/app/services/global-observable.service';
import { from } from 'rxjs';
@Component({
  selector: "app-topup",
  templateUrl: "./topup.page.html",
  styleUrls: ["./topup.page.scss"],
})
export class TopupPage implements OnInit {
  balance: string;
  vaAccount: any;
  vaLoaded = false;
  vaError = false;

  constructor(
    public modalCtrl: ModalController,
    private va: VaService,
    private loading: LoadingService,
    private alert: AlertService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private clipboard: Clipboard,
    private globalObservable: GlobalObservableService,
    public toastController: ToastController
  ) {
    this.globalObservable.getObservable().subscribe(data => {
      // console.log(data);
      if (data.label == "va:create") {
        this.getData();
      }
    })

    this.getData();
  }

  ngOnInit() {
    if (!this.balance) {
      this.storage.get("balance").then((balance) => {
        this.balance = balance;
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  getData() {
    this.vaLoaded = false;
    this.vaError = false;
    this.vaAccount = {};
    setTimeout(() => {

      this.va.getVas().then(
        (response: any) => {
          this.vaLoaded = true;
          this.vaError = false;

          this.vaAccount = response.body;
          console.log(this.vaAccount);
          if (response.body.vaNumbers.length == 0) {
            this.vaAccount = response.body;
            this.storage.get("company").then((company) => {
              let c = company;
              console.log(c);
              let banks = c.banks;
                console.log(banks)
              if (banks.length > 1) {
                this.presentAlertRadio(banks);
              } else {
                this.createVa(banks[0]);
                this.va.getVas().then(
                  (response: any) => {
                    this.vaAccount = response.body;
                  })
              }
            });
          }
        },
        (error) => {
          this.vaLoaded = true;
          this.vaError = true;
          this.alert.toastError(error);
        }
      );
    }, 300);
  }

  vaFormat(va) {
    return (
      va.slice(0, 4) +
      "-" +
      va.slice(4, 8) +
      "-" +
      va.slice(8, 12) +
      "-" +
      va.slice(12, 16)
    );
  }

  async openHistory() {
    const modal = await this.modalCtrl.create({
      component: TopupHistoryPage,
    });
    return await modal.present();
  }

  async presentAlertRadio(banks) {
    let inputs = [];
    for (let ii = 0; ii < banks.length; ii++) {
      inputs.push({
        name: banks[ii],
        type: "radio",
        label: banks[ii],
        value: banks[ii],
      });
    }

    const alert = await this.alertCtrl.create({
      header: "Please Choose a Bank",
      inputs: inputs,
      buttons: [
        {
          text: "Batal",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
        {
          text: "OK",
          handler: (data) => {
            this.createVa(data);
          },
        },
      ],
    });

    await alert.present();
  }

  createVa(bank) {
    this.vaLoaded = false;
    this.vaError = false;
    this.loading.show();

    this.va.createVa(bank).then(
      (response: any) => {
        this.loading.hide();
        this.vaLoaded = true;
        this.vaError = false;
        this.vaAccount = response;
        console.log(response);
        this.globalObservable.publish({
          label: "va:create",
          value: response,
        });
      },
      (error) => {
        this.loading.hide();
        this.vaLoaded = true;
        this.vaError = true;
        this.alert.toastError(error);
      }
    );
  }

  copyVa(va) {
    this.clipboard.copy(va.replace(/-/g, ''));
    console.log(va.replace(/-/g, ''));
    this.presentToast();
  }
  
  async topup_merchant() {
    const modal = await this.modalCtrl.create({
      component: TopupMerchantPage,
    });
    return await modal.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Va Number has coppied',
      duration: 1000,
      color: 'primary',
      mode: 'ios'
    });
    toast.present();
  }
}
