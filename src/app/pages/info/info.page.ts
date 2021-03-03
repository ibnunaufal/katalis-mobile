import { Component, OnInit } from "@angular/core";
import { InfoService } from "src/app/services/info.service";
import { AlertService } from "src/app/services/alert.service";
import { LoadingService } from 'src/app/services/loading.service';
import { ThrowStmt } from '@angular/compiler';
import { ModalController } from '@ionic/angular';
import { InfoDetailPage } from '../info-detail/info-detail.page';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"],
})
export class InfoPage implements OnInit {
  data: any;
  apiUrl = environment.API_URL;
  profile: any;
  show = false;
  start: number = 0;
  limit: number = 10;
  field: string = 'tags';
  key: string;
  constructor(
    private info: InfoService,
    private alertService: AlertService,
    private loading: LoadingService,
    private modalCtrl: ModalController,
    private domSanitizer: DomSanitizer,
    private storage: Storage) {
    // this.loading.show()
  }


  ngOnInit() {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.info.getAll(this.start, this.limit, this.field, this.key).then(
      (res: any) => {
        this.data = res.content;
        console.log(this.data)
        this.show = true;
      },
      (error) => {
        this.alertService.toastError(error);
      }
    );

  }

  async presentInfoDetail(info) {
    const modal = await this.modalCtrl.create({
      component: InfoDetailPage,
      componentProps: {
        info: info,
      },
    });

    await modal.present();
  }

  getImgContent(photoUrl): SafeUrl {
    var img;
    img = this.apiUrl + 'main_a/image/get/' + photoUrl + '/pas';
    return this.domSanitizer.bypassSecurityTrustUrl(img);

  }

}
