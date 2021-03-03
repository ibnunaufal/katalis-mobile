import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.page.html',
  styleUrls: ['./info-detail.page.scss'],
})
export class InfoDetailPage implements OnInit {
  info: any;

  apiUrl = environment.API_URL;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.info = this.navParams.get("info");
    console.log(this.info)
  }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
