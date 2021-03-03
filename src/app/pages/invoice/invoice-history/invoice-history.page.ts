import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AlertController,
  IonInfiniteScroll,
  ModalController,
} from "@ionic/angular";
import { ReplacePipe } from "src/app/pipes/replace.pipe";
import { AlertService } from "src/app/services/alert.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { LoadingService } from "src/app/services/loading.service";
import { InvoiceDetailPage } from "../../invoice-detail/invoice-detail.page";

@Component({
  selector: "app-invoice-history",
  templateUrl: "./invoice-history.page.html",
  styleUrls: ["./invoice-history.page.scss"],
  providers: [CurrencyPipe, ReplacePipe],
})
export class InvoiceHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  start = 0;
  limit = 5;
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
    public modalCtrl: ModalController
  ) {
    this.getData(this.start, this.limit);
  }

  ngOnInit() { }

  getData(start, limit) {
    this.invoicesLoaded = false;
    this.invoicesError = false;
    this.invoices = [];

    this.invoice
      .getPaid(0, 10)
      .then((invoices: any) => {
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

    this.invoice
      .getPaid(this.start, this.limit)
      .then((invoices: any) => {
        for (let ii = 0; ii < invoices.body.content.length; ii++) {
          this.invoices.push(invoices.body.content[ii]);
        }
        if (invoices.body.content.length < this.limit) {
          event.target.disabled = true;
        } else {
          event.target.complete();
        }

      })
      .catch((error) => {
        this.invoicesLoaded = true;
        this.invoicesError = false;
        this.alert.toastError(error);

        event.target.complete();
      });
  }

  doRefresh(event) {
    this.invoicesLoaded = false;
    this.invoicesError = false;
    this.invoices = [];

    this.start = 0;

    this.infiniteScroll.disabled = false;

    this.invoice
      .getPaid(0, 10)
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
      alert = await this.alertCtrl.create({
        header: "Konfirmasi",
        message:
          "Apakah Anda yakin ingin membayar tagihan " +
          invoice.title +
          "? (Remaining: " +
          this.replacePipe.transform(
            this.currencyPipe.transform(
              invoice.amount - invoice.paidAmount,
              "Rp. ",
              true,
              "1.0"
            ),
            ",",
            "."
          ) +
          ")",
        inputs: [
          {
            name: "amount",
            type: "number",
            placeholder: "Amount",
          },
        ],
        buttons: [
          {
            text: "Batal",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Bayar",
            handler: (data) => {
              if (!data.amount) {
                this.alert.toastError("Amount is required.");
              } else if (data.amount > invoice.amount - invoice.paidAmount) {
                this.alert.toastError("Amount is invalid");
              } else {
                this.confirmPay(invoice.invoiceId, data.amount, invoice.tags);
              }
            },
          },
        ],
      });
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
            text: "Batal",
            handler: () => {
              this.confirmPay(invoice.invoiceId, invoice.amount, invoice.tags);
            },
          },
        ],
      });
    }

    await alert.present();
  }

  confirmPay(id, amount, tag) {
    this.loading.show();

    this.invoice.payInvoice(id, amount, tag).then(
      () => {
        this.loading.hide();
        this.alert.alert("Success");
        this.start = 1;
        this.getData(this.start, this.limit);
      },
      (error) => {
        this.loading.hide();
        this.alert.alert(error);
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
}
