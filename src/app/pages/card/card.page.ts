import { Component, OnInit, ViewChild } from "@angular/core";
import { CardService } from "src/app/services/card.service";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { IonSlides, ModalController } from "@ionic/angular";
import { CardSetLimitPage } from "../card-set-limit/card-set-limit.page";
import { GlobalObservableService } from "src/app/services/global-observable.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.page.html",
  styleUrls: ["./card.page.scss"],
})
export class CardPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  cards: any;
  saldo;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  detailCard: any;
  constructor(
    private card: CardService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private globalObservable: GlobalObservableService
  ) {
    this.getCard();

    this.globalObservable.getObservable().subscribe(data => {
      // console.log(data);

      if (data.label == "card:success") {
        this.getCard();

      }
    })
  }

  ngOnInit() { }

  getCard() {
    this.card.getCard(0, 10).then(
      (res: any) => {
        this.detailCard = res.body[0];
        this.cards = res.body;
        console.log(res.body);
      },
      (error) => {
        this.alertService.toastError(error);
      }
    );
  }

  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      this.detailCard = this.cards[index];
      console.log(this.detailCard.cardbalance);
    });
  }

  async setLimit() {
    const modal = await this.modalCtrl.create({
      component: CardSetLimitPage,
      componentProps: {
        detailCard: this.detailCard,
      },
    });

    await modal.present();
  }
}
