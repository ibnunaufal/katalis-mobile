import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-inbox-detail",
  templateUrl: "./inbox-detail.page.html",
  styleUrls: ["./inbox-detail.page.scss"],
})
export class InboxDetailPage implements OnInit {
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
