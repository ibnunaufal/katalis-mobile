import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
import { DonationService } from 'src/app/services/donation.service';
import { GlobalObservableService } from 'src/app/services/global-observable.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PopoverComponentPageModule } from '../popover-component/popover-component.module';
import { PopoverComponentPage } from '../popover-component/popover-component.page';

@Component({
  selector: 'app-invoice-input-amount',
  templateUrl: './invoice-input-amount.page.html',
  styleUrls: ['./invoice-input-amount.page.scss'],
  providers: [CurrencyPipe]
})
export class InvoiceInputAmountPage implements OnInit {
  @ViewChild('autofocus', { static: false }) ionInput: IonInput;

  start = 0;
  limit = 10;
  invoicesLoaded = false;
  invoicesError = false;
  invoices;


  temp_nominal = 0;
  nominal = "";
  donationName;

  invoice: any

  id;
  tag;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loading: LoadingService,
    private navCtrl: NavController,
    private currencyPipe: CurrencyPipe,
    private alert: AlertService,
    public alertCtrl: AlertController,
    private storage: Storage,
    private InvoiceService: InvoiceService,
    private globalObservable: GlobalObservableService,
    private popover: PopoverController,
    private donationService: DonationService
  ) {
    this.invoice = this.navParams.get('invoice');
    console.log(this.invoice);
    this.id = this.invoice.invoiceId;
    this.tag = this.invoice.tags

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.setFocusOnInput()
  }

  setFocusOnInput() {
    this.ionInput.setFocus();
  }


  onChangePrice(evt) {

    this.temp_nominal = evt.replace(/[^0-9.]/g, "");

    this.nominal = this.getCurrency(Number(this.temp_nominal))

    console.log("box_price_formatted: " + Number(this.temp_nominal));
  }


  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'IDR', 'Rp ', '1.0-0');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirmPay() {
    // console.log(this.temp_nominal);

    if (!this.temp_nominal || this.temp_nominal == 0) {

      this.alert.toastError("Silahkan masukkan nominal pembayaran anda.");

    } else if (this.temp_nominal > this.invoice.amount - this.invoice.paidAmount) {

      this.alert.toastError("Pastikan nominal pembayaran anda benar");

    } else {
      this.loading.show();
      this.InvoiceService.payInvoice(this.id, this.temp_nominal, this.tag).then(
        (invoice: any) => {
          this.loading.hide()
          // this.alert.toastSuccess("Pembayaran tagihan " + this.invoice.title + " sebesar " + this.nominal + " telah berhasil dilakukan.");
          this.alert.popoverSuccess("Transaksi Berhasil", "Pembayaran tagihan " + this.invoice.title + " sebesar " + this.nominal + " telah berhasil dilakukan.")
          this.globalObservable.publish({
            label: "balance:reload"
          });
          this.globalObservable.publish({
            label: "invoide:paid"
          });
          this.dismiss();
        },
        (error: any) => {
          this.loading.hide()
          this.alert.popoverError("Terjadi Kesalahan Sistem", error.split('Message:').pop())

        }
      );

    }
  }


}



