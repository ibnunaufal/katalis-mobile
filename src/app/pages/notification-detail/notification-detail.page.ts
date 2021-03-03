import { Component, OnInit } from "@angular/core";
import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController, NavParams } from "@ionic/angular";


@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {
  inbox: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private vibration: Vibration
  ) {
    this.vibration.vibrate([200]);
    this.inbox = JSON.stringify(this.navParams.get("inbox"));
  }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
