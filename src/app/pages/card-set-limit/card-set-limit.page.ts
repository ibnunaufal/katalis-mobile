import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from "src/app/services/alert.service";
import { UserService } from 'src/app/services/user.service';
import { CurrencyPipe } from '@angular/common';
import { CardService } from 'src/app/services/card.service';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: 'app-card-set-limit',
  templateUrl: './card-set-limit.page.html',
  styleUrls: ['./card-set-limit.page.scss'],
  providers: [CurrencyPipe]
})
export class CardSetLimitPage implements OnInit {

  @ViewChild('autofocus1', { static: false }) ionInput1: IonInput;
  unlimited;
  detail: any;

  setUnlimited;

  daily;
  max;
  tempDaily: Number;
  tempMax: Number;
  constructor(private navParams: NavParams,
    private LoadingService: LoadingService,
    private userService: UserService,
    private alert: AlertController,
    private alertService: AlertService,
    private currencyPipe: CurrencyPipe,
    private modalCtrl: ModalController,
    private cardService: CardService,
    private globalObservable: GlobalObservableService
  ) {
    this.LoadingService.show()
    this.userService.getUser().then((res: any) => {
      this.LoadingService.hide()
      this.setUnlimited = res.body.accounts[0].transactionUnlimited
    })

    this.detail = this.navParams.get('detailCard');

    this.tempDaily = this.detail.limitDaily
    this.tempMax = this.detail.limitMax

    this.daily = this.getCurrency(this.detail.limitDaily)
    this.max = this.getCurrency(this.detail.limitMax)

  }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.setFocusOnInput()
  }

  setFocusOnInput() {
    this.ionInput1.setFocus();
  }

  updatetogle(event) {
    this.unlimited = event.detail.checked

  }
  setLimit() {
    this.LoadingService.show()

    this.userService.getUser().then((res: any) => {
      // this.LoadingService.hide

      var data = res.body;
      var temp = {
        "active": data.accounts[0].active,
        "address": data.address,
        "banks": data.banks,
        "callerId": "",
        "callerName": "",
        "callerTitle": "",
        "dateOfBirth": data.dateOfBirth,
        "email": data.email,
        "gender": data.gender,
        "maritalStatus": data.maritalStatus,
        "name": data.name,
        "nik": data.name,
        "note": data.note,
        "phone": data.phone,
        "photoUrl": data.photoUrl,
        "placeOfBirth": data.placeOfBirth,
        "religion": data.religon,
        "roles": data.accounts[0].roles,
        "socmedAccounts": data.sosmedAccounts,
        "sourceOfFund": data.accounts[0].sourceOfFund,
        "tags": [],
        "transactionUnlimited": this.unlimited
      }

      var cardLimit = {
        "accountId": this.detail.accountId,
        "active": this.detail.active,
        "balance": this.detail.balance,
        "callerId": this.detail.callerId,
        "callerName": this.detail.callerName,
        "companyId": this.detail.companyId,
        "expiredDate": "",
        "id": this.detail.id,
        "limitDaily": this.tempDaily,
        "limitMax": this.tempMax,
        "nfcId": this.detail.nfcId,
        "photoUrl": this.detail.photoUrl
      }


      this.cardService.updateCard(this.detail.id, cardLimit).then((updateCard) => {
        this.globalObservable.publish({
          label: "card:success"
        });
        this.userService.updateUserUnlimited(temp).then((res) => {
          this.LoadingService.hide()
          this.alertService.popoverSuccess("Berhasil", "Pengaturan limit kartu telah berhasil.")
          this.dismiss()
        },
          (error: any) => {
            this.LoadingService.hide()
            this.alertService.popoverSuccess("Error", error.split('Message:').pop())

          }

        )
      },
        (error: any) => {
          this.LoadingService.hide()
          this.alertService.popoverError("Error", error.split('Message:').pop())

        }
      )
    },
      (error: any) => {
        this.LoadingService.hide
        this.alertService.popoverError("Error", error.split('Message:').pop())

      }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }


  onChangeMax(evt) {

    this.tempMax = evt.replace(/[^0-9.]/g, "");

    this.max = this.getCurrency(Number(this.tempMax))

    console.log("box_price_formatted: " + Number(this.tempMax));
  }

  onChangeDaily(evt) {

    this.tempDaily = evt.replace(/[^0-9.]/g, "");

    this.daily = this.getCurrency(Number(this.tempDaily))

    console.log("box_price_formatted: " + Number(this.tempDaily));
  }


  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'IDR', 'Rp ', '1.0-0');
  }
}

