import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { AlertService } from "src/app/services/alert.service";
import { VaService } from "src/app/services/va.service";

@Component({
  selector: "app-topup-history",
  templateUrl: "./topup-history.page.html",
  styleUrls: ["./topup-history.page.scss"],
})
export class TopupHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  start = 0;
  limit = 10;
  vaHistoriesLoaded = false;
  vaHistoriesError = false;
  vaHistories;

  constructor(
    public modalCtrl: ModalController,
    private vaService: VaService,
    private alert: AlertService
  ) {
    this.getData(this.start, this.limit);
    // console.log(this.vaHistories);

  }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  getData(start, limit) {
    this.vaHistoriesLoaded = false;
    this.vaHistoriesError = false;
    this.vaHistories = [];

    this.vaService.getVaHistories(start, limit).then(
      (response: any) => {
        this.vaHistoriesLoaded = true;
        this.vaHistoriesError = false;
        this.vaHistories = response.body.content;

      },
      (error) => {
        this.vaHistoriesLoaded = true;
        this.vaHistoriesError = true;
        this.alert.toastError(error);
      }
    );
  }

  loadData(event) {
    this.start += 1;

    this.vaService.getVaHistories(this.start, this.limit).then(
      (response: any) => {
        for (let ii = 0; ii < response.content.length; ii++) {
          this.vaHistories.push(response.content[ii]);
        }

        if (response.content.length < this.limit) {
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
    this.vaHistoriesLoaded = false;
    this.vaHistoriesError = false;
    this.vaHistories = [];

    this.start = 0;

    this.infiniteScroll.disabled = false;

    this.vaService.getVaHistories(this.start, this.limit).then(
      (response: any) => {
        this.vaHistoriesLoaded = true;
        this.vaHistoriesError = false;
        this.vaHistories = response.content;

        event.target.complete();
      },
      (error) => {
        this.vaHistoriesLoaded = true;
        this.vaHistoriesError = true;
        this.alert.alert(error);

        event.target.complete();
      }
    );
  }
}
