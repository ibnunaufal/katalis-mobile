import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController, NavParams } from "@ionic/angular";
import { CurrencyPipe } from "@angular/common";
import { ReplacePipe } from "src/app/pipes/replace.pipe";
import { AlertService } from "src/app/services/alert.service";
import { LoadingService } from "src/app/services/loading.service";
import { InvoiceService } from "src/app/services/invoice.service";

@Component({
  selector: "app-invoice-detail",
  templateUrl: "./invoice-detail.page.html",
  styleUrls: ["./invoice-detail.page.scss"],
  providers: [CurrencyPipe, ReplacePipe],
})
export class InvoiceDetailPage implements OnInit {
  invoice: any;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private currencyPipe: CurrencyPipe,
    private replacePipe: ReplacePipe,
    private alert: AlertService,
    private loading: LoadingService,
    private _invoice: InvoiceService
  ) {
    this.invoice = this.navParams.get("invoice");
  }

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
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
            text: "Bayar",
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

    this._invoice.payInvoice(id, amount, tag).then(
      () => {
        this.loading.hide();
        this.alert.alert("Success");
        this.dismissModal();
      },
      (error) => {
        this.loading.hide();
        this.alert.alert(error);
      }
    );
  }
}
