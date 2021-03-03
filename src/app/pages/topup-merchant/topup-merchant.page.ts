import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, IonInput } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { AlertService } from "src/app/services/alert.service";
import { Storage } from "@ionic/storage";
import { TopupMerchantService } from "src/app/services/topup-merchant.service"
import { TopupMerchantDetailPage } from "../topup-merchant-detail/topup-merchant-detail.page"
import { CurrencyPipe } from '@angular/common';
import { SheetStates } from 'ionic-custom-bottom-sheet';
import { LoadingService } from 'src/app/services/loading.service';

interface Metode {
  id: number;
  metodepembayaran: string;
  image: String
}

@Component({
  selector: 'app-topup-merchant',
  templateUrl: './topup-merchant.page.html',
  styleUrls: ['./topup-merchant.page.scss'],
  providers: [CurrencyPipe]
})
export class TopupMerchantPage implements OnInit {

  @ViewChild('autofocus', { static: false }) ionInput: IonInput;
  tutorial: any[];
  automaticClose = false;
  seletedMetode;
  merchantAmount;
  btn_status = true;

  temp_nominal = 0;
  nominal = "";
  merchant = 0;

  metodes: Metode[] = [
    {
      id: 1,
      metodepembayaran: 'Indomaret',
      image: "indomaret.png"
    },
    {
      id: 2,
      metodepembayaran: 'Alfamart',
      image: "alfamart.png"
    },
    {
      id: 3,
      metodepembayaran: 'Gopay',
      image: "gopay.png"
    },
    {
      id: 4,
      metodepembayaran: 'Tokopedia',
      image: "tokopedia.png"
    },
    {
      id: 5,
      metodepembayaran: 'Linkaja',
      image: "linkaja.png"
    },
    {
      id: 6,
      metodepembayaran: 'Blibli',
      image: "blibli.png"
    },
    {
      id: 7,
      metodepembayaran: 'Bayarind',
      image: "bayarind.png"
    },
    {
      id: 8,
      metodepembayaran: 'Kaspro',
      image: "kaspro.png"
    },
    {
      id: 9,
      metodepembayaran: 'Ayopop',
      image: "ayopop.png"
    },
    {
      id: 10,
      metodepembayaran: 'Mobilepulsa',
      image: "mobilepulsa.png"
    }

  ];

  constructor(
    public modalCtrl: ModalController,
    private http: HttpClient,
    private alert: AlertService,
    private storage: Storage,
    private TopupMerchantService: TopupMerchantService,
    private currencyPipe: CurrencyPipe,
    public actionSheetController: ActionSheetController,
    private loading: LoadingService
  ) {
    this.seletedMetode = this.merchant;
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.setFocusOnInput()
  }

  setFocusOnInput() {
    this.ionInput.setFocus();
  }

  async Checkout() {
    if (!this.nominal) {
      this.alert.toastError("Amount is required.");
    } else {
      const modal = await this.modalCtrl.create({
        component: TopupMerchantDetailPage,
        componentProps: {
          merchantAmount: this.nominal,
          idmetode: this.seletedMetode
        }
      });

      return await modal.present();
    }
  }

  chooseMerchant(merchant) {
    this.merchant = merchant;
    this.seletedMetode = merchant;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Metode Pembayaran',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Indomaret',
        icon: 'md-indomaret',
        handler: () => {
          this.chooseMerchant(0)
        }
      },
      {
        text: 'Alfamart',
        icon: 'md-alfamart',
        handler: () => {
          this.chooseMerchant(1)
        }
      },
      {
        text: 'Gopay',
        icon: 'md-gopay',
        handler: () => {
          this.chooseMerchant(2)
        }
      },
      {
        text: 'Tokopedia',
        icon: 'md-tokopedia',
        handler: () => {
          this.chooseMerchant(3)
        }
      },
      {
        text: 'Linkaja',
        icon: 'md-linkaja',
        handler: () => {
          this.chooseMerchant(4)
        }
      },
      {
        text: 'Blibli',
        icon: 'md-blibli',
        handler: () => {
          this.chooseMerchant(5)
        }
      },
      {
        text: 'Bayarind',
        icon: 'md-bayarind',
        handler: () => {
          this.chooseMerchant(6)
        }
      },
      {
        text: 'Kaspro',
        icon: 'md-kaspro',
        handler: () => {
          this.chooseMerchant(7)
        }
      },
      {
        text: 'Ayopop',
        icon: 'md-ayopop',
        handler: () => {
          this.chooseMerchant(8)
        }
      },
      {
        text: 'Mobilepulsa',
        icon: 'md-mobilepulsa',
        handler: () => {
          this.chooseMerchant(9)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onChangePrice(evt) {

    this.temp_nominal = evt.replace(/[^0-9.]/g, "");

    // console.log("box_price_formatted: " + Number(this.box_price));
    this.nominal = this.getCurrency(Number(this.temp_nominal))
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'IDR', 'Rp ', '1.0-0');
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async proses() {
    if (!this.nominal) {
      this.alert.toastError("Amount is required.");
    } else {
      // this.loading.show();

      this.btn_status = false;
      this.TopupMerchantService.TOTUP_MERCHANT_SERVICES(this.temp_nominal).then(
        async (res: any) => {
          this.loading.hide()
          this.btn_status = true;
          const modal = await this.modalCtrl.create({
            component: TopupMerchantDetailPage,
            componentProps: {
              merchantAmount: this.nominal,
              idmetode: this.seletedMetode
            }
          });

          return await modal.present();
        },
        (error: any) => {
          this.loading.hide()
          this.btn_status = true;
          this.alert.alert(error.split('Message:').pop());
        }
      );
    }
  }

}
