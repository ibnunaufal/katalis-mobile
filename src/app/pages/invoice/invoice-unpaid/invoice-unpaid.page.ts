import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AlertController,
  ModalController,
  IonInfiniteScroll,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ReplacePipe } from "src/app/pipes/replace.pipe";
import { AlertService } from "src/app/services/alert.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { LoadingService } from "src/app/services/loading.service";
import { InvoiceDetailPage } from "../../invoice-detail/invoice-detail.page";
import { InvoiceInputAmountPage } from "../../invoice-input-amount/invoice-input-amount.page";
import { GlobalObservableService } from 'src/app/services/global-observable.service';
@Component({
  selector: "app-invoice-unpaid",
  templateUrl: "./invoice-unpaid.page.html",
  styleUrls: ["./invoice-unpaid.page.scss"],
  providers: [CurrencyPipe, ReplacePipe],
})
export class InvoiceUnpaidPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  start = 0;
  limit = 10;
  invoicesLoaded = false;
  invoicesError = false;
  invoices;

  constructor(
    private invoice: InvoiceService,
    private alert: AlertService,
    public alertCtrl: AlertController,
    private loading: LoadingService,
    private currencyPipe: CurrencyPipe,
    private replacePipe: ReplacePipe,
    public modalCtrl: ModalController,
    public storage: Storage,
    private globalObservable: GlobalObservableService,
  ) {
    this.getData(this.start, this.limit);

    this.globalObservable.getObservable().subscribe(data => {
      // console.log(data);

      if (data.label == "invoide:paid") {
        this.getData(this.start, this.limit);
        this.globalObservable.publish({
          label: "balance:reload"
        });
      }
    })
  }

  ngOnInit() { }

  getData(start, limit) {
    this.invoicesLoaded = false;
    this.invoicesError = false;
    this.invoices = [];

    this.invoice
      .getUnpaid(start, limit)
      .then((invoices: any) => {
        console.log(invoices);
        this.invoicesLoaded = true;
        this.invoicesError = false;
        this.invoices = invoices.body.content;
      })
      .catch((error) => {
        this.invoicesLoaded = true;
        this.invoicesError = false;
        this.alert.toastError(error);
      });
  }

  loadData(event) {
    this.start += 1;

    this.invoice.getUnpaid(this.start, this.limit).then(
      (response: any) => {
        for (let ii = 0; ii < response.body.content.length; ii++) {
          this.invoices.push(response.body.content[ii]);
        }
        if (response.body.content.length < this.limit) {
          event.target.disabled = true;
        } else {
          event.target.complete();
        }
      },
      (error) => {
        this.alert.alert(error);
      }
    );
  }

  doRefresh(event) {
    this.invoicesLoaded = false;
    this.invoicesError = false;

    this.invoices = [];

    this.start = 0;

    this.infiniteScroll.disabled = false;

    this.invoice
      .getUnpaid(this.start, this.limit)
      .then((invoices: any) => {
        this.invoicesLoaded = true;
        this.invoicesError = false;
        this.invoices = invoices.body.content;

        event.target.complete();
      })
      .catch((error) => {
        this.invoicesLoaded = true;
        this.invoicesError = false;
        this.alert.toastError(error);

        event.target.complete();
      });
  }

  async payInvoice(invoice) {



    let alert;

    if (invoice.partialMethod) {
      const modal = await this.modalCtrl.create({
        component: InvoiceInputAmountPage,
        componentProps: {
          invoice: invoice,
        },
      });
      return await modal.present();
      // alert = await this.alertCtrl.create({
      //   header: "Konfirmasi",
      //   message:
      //     "Apakah Anda yakin ingin membayar tagihan " +
      //     invoice.title +
      //     "? (Remaining: " +
      //     this.replacePipe.transform(
      //       this.currencyPipe.transform(
      //         invoice.amount - invoice.paidAmount,
      //         "Rp. ",
      //         true,
      //         "1.0"
      //       ),
      //       ",",
      //       "."
      //     ) +
      //     ")",
      //   inputs: [
      //     {
      //       name: "amount",
      //       type: "number",
      //       placeholder: "Amount",
      //     },
      //   ],
      //   buttons: [
      //     {
      //       text: "Batal",
      //       role: "cancel",
      //       cssClass: "secondary",
      //     },
      //     {
      //       text: "Bayar",
      //       handler: (data) => {
      //         if (!data.amount) {
      //           this.alert.toastError("Amount is required.");
      //         } else if (data.amount > invoice.amount - invoice.paidAmount) {
      //           this.alert.toastError("Amount is invalid");
      //         } else {
      //           this.confirmPay(invoice.invoiceId, data.amount, invoice.tags);
      //         }
      //       },
      //     },
      //   ],
      // });
    } else {
      alert = await this.alertCtrl.create({
        header: "Konfirmasi",
        message:
          "Apakah Anda yakin ingin membayar tagihan " +
          invoice.title +
          "? (Nominal: " +
          this.replacePipe.transform(
            this.currencyPipe.transform(invoice.amount, "Rp. ", true, "1.0"),
            ",",
            "."
          ) +
          ")",

        buttons: [
          {
            text: "Batal",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Bayar",
            handler: () => {
              this.confirmPay(invoice.invoiceId, invoice.title, invoice.amount, invoice.tags);
            },
          },
        ],
      });
    }

    await alert.present();
  }

  confirmPay(id, title, amount, tag) {
    this.start = 0;
    this.loading.show();

    this.invoice.payInvoice(id, amount, tag).then(
      (invoice: any) => {
        this.loading.hide();
        this.alert.popoverSuccess("Transaksi Berhasil", "Pembayaran tagihan " + title + " sebesar " + this.getCurrency(amount) + " telah berhasil dilakukan.")
        this.getData(this.start, this.limit);

        this.globalObservable.publish({
          label: "balance:reload"
        });
      },
      (error: any) => {

        this.loading.hide();
        this.alert.alert(error.split('Message:').pop());
      }
    );
  }

  async openDetail(invoice) {
    const modal = await this.modalCtrl.create({
      component: InvoiceDetailPage,
      componentProps: {
        invoice: invoice,
      },
    });
    return await modal.present();
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'IDR', 'Rp ', '1.0-0');
  }
}
