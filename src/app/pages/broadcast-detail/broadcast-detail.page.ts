import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-broadcast-detail",
  templateUrl: "./broadcast-detail.page.html",
  styleUrls: ["./broadcast-detail.page.scss"],
})
export class BroadcastDetailPage implements OnInit {
  inbox: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.inbox = this.navParams.get("inbox");
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
