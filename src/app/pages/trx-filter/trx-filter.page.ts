import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trx-filter',
  templateUrl: './trx-filter.page.html',
  styleUrls: ['./trx-filter.page.scss'],
})
export class TrxFilterPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
