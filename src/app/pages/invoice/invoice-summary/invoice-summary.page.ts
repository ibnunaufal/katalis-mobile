import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AlertService } from 'src/app/services/alert.service';
// import { InvoiceSummaryDetailPage } from '../../invoice-summary-detail/invoice-summary-detail.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.page.html',
  styleUrls: ['./invoice-summary.page.scss']
})
export class InvoiceSummaryPage implements OnInit {
  summaryListsLoaded = false;
  summaryListsError = false;
  summaryLists;

  constructor(
    private invoice: InvoiceService,
    private alert: AlertService,
    public modalCtrl: ModalController
  ) {
    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.summaryListsLoaded = false;
    this.summaryListsError = false;
    this.summaryLists = [];

    this.invoice
      .getAll(0, 10)
      .then((invoices: any) => {
        this.summaryListsLoaded = true;
        this.summaryListsError = false;
        this.summaryLists = invoices.body.content;
      })
      .catch((error) => {
        this.summaryListsLoaded = true;
        this.summaryListsError = true;
        this.alert.toastError(error);
      });

  }

  doRefresh(event) {
    this.summaryListsLoaded = false;
    this.summaryListsError = false;
    this.summaryLists = [];

    this.invoice
      .getAll(0, 10)
      .then((invoices: any) => {
        this.summaryListsLoaded = true;
        this.summaryListsError = false;
        this.summaryLists = invoices.body.content;

        event.target.complete();
      })
      .catch((error) => {
        this.summaryListsLoaded = true;
        this.summaryListsError = true;
        this.alert.toastError(error);

        event.target.complete();
      });

  }

  // async openDetail(invoice) {
  //   const modal = await this.modalCtrl.create({
  //     component: InvoiceSummaryDetailPage,
  //     componentProps: {
  //       invoice: invoice
  //     }
  //   });
  //   return await modal.present();
  // }
}
