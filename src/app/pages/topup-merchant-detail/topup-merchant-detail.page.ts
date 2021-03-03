import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams, LoadingController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { AlertService } from "src/app/services/alert.service";
import { Storage } from "@ionic/storage";
import { TopupMerchantService } from "src/app/services/topup-merchant.service"

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-topup-merchant-detail',
  templateUrl: './topup-merchant-detail.page.html',
  styleUrls: ['./topup-merchant-detail.page.scss'],
})
export class TopupMerchantDetailPage implements OnInit {
  tutorial: any[];
  item: any;
  automaticClose = false;
  merchantAmount;
  idmetode;
  company: any;
  accountNumber: any;
  id: any;
  profile: any;
  btn_status = true;
  constructor(
    public modalCtrl: ModalController,
    private http: HttpClient,
    private alert: AlertService,
    private storage: Storage,
    private TopupMerchantService: TopupMerchantService,
    private navparams: NavParams,
    private loadingCtrl: LoadingController,
    private clipboard: Clipboard,
    private photoViewer: PhotoViewer
  ) { }

  ngOnInit() {

    this.http.get('assets/tutorial.json').subscribe(res => {
      this.merchantAmount = this.navparams.get('merchantAmount')
      this.idmetode = this.navparams.get('idmetode')
      this.item = res['items'][0].children[this.idmetode];
      this.tutorial = res['items']


      console.log(this.merchantAmount, this.idmetode, this.tutorial)

    });

    this.storage.get('company').then((company: any) => {
      this.company = company.name;
      // this.accountId = company.id;
      // console.log(this.accountId)
      this.storage.get("profile").then(profile => {
        this.profile = profile.accounts[0].accountNumber;
        this.id = profile.accounts[0].callerIdentities[0].id
        console.log(this.id)
      })
    });

  }



  async proses() {
    this.btn_status = false;

    // this.accountId = profile.accounts[0].id
    // this.callerId = profile.accounts[0].callerIdentities[0].callerId
    // this.id,this.company,this.profile
    this.TopupMerchantService.TOTUP_MERCHANT_SERVICES(this.merchantAmount).then(
      (res: any) => {
        this.alert.alert("Silahkan Melakukan Pembayaran sesuai metode pembayaran yang telah dipilih");
        this.btn_status = true;
      },
      (error: any) => {
        this.btn_status = true;
        this.alert.alert(error.split('Message:').pop());
      }
    );
  }

  copy(nis) {

    this.clipboard.copy(nis);
    this.alert.toastSuccess('Copied to clipboard!')
  }


  toggleSection(index) {
    this.tutorial[index].open = !this.tutorial[index].open;

    if (this.automaticClose && this.tutorial[index].open) {
      this.tutorial
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex) {
    this.tutorial[index].children[childIndex].open = !this.tutorial[index].children[childIndex].open;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  openPreview(img) {
    this.photoViewer.show(img);

  }
}
