import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController, NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { UserService } from "src/app/services/user.service";
import { ChangePasswordPage } from "../change-password/change-password.page";
import { SupportAppPage } from "../support-app/support-app.page";

import { environment } from 'src/environments/environment';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { ChangeLanguagePage } from '../change-language/change-language.page';
import { FaqPage } from '../faq/faq.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingService } from "src/app/services/loading.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user: any;
  company: string;
  apiUrl = environment.API_URL;
  selectedLanguage: string;
  unlimited: any;
  data: any;
  myValue: any;
  names: any;

  setUnlimited;
  constructor(
    private storage: Storage,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private alert: AlertService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private LoadingService: LoadingService,
    private globalObservable: GlobalObservableService,
    private navCtrl: NavController
  ) {
    this.userService.getUser().then((res: any) => {
      this.setUnlimited = res.body.accounts[0].transactionUnlimited
    })
    this.globalObservable.getObservable().subscribe(data => {
      console.log(data);

      if (data.label == "profile:change") {
        this.storage.get("profile").then(
          profile => {
            this.user = profile;
          },
          err => {
            this.alert.toastError(err);
          })
      }
    })

    this.storage.get('company').then((company) => {
      company = company.name;
      this.storage.get("profile").then(
        profile => {
          this.user = profile;
        },
        err => {
          this.alert.toastError(err);
        }
      );
    })
  }

  ngOnInit() {


  }
  // updatetogle(event) {
  //   this.LoadingService.show
  //   this.unlimited = event.detail.checked
  //   // console.log(this.unlimited)

  //   this.userService.getUser().then((res: any) => {
  //     this.LoadingService.hide

  //     var data = res.body;
  //     data.accounts[0].transactionUnlimited = this.unlimited

  //     this.userService.updateUserUnlimited(data).then((res) => {
  //       this.alert.toastSuccess("Unlimited settings have been successful");
  //     },
  //       (error: any) => {
  //         this.LoadingService.hide
  //         this.alert.alert(error.split('Message:').pop());
  //       }

  //     )

  //   })
  // }
  async presentChangePassword() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordPage
    });

    await modal.present();
  }

  // async presentSupport() {
  //   const modal = await this.modalCtrl.create({
  //     component: SupportAppPage,
  //   });

  //   await modal.present();
  // }

  async presentLogout() {
    const confirm = await this.alertCtrl.create({
      header: "Konfirmasi",
      message: "Apakah Anda yakin ingin logout?",
      buttons: [
        {
          text: "Batal",
          handler: () => { }
        },
        {
          text: "Logout",
          handler: () => {
            this.confirmLogout();
          }
        }
      ]
    });

    confirm.present();
  }

  confirmLogout() {
    this.storage.remove("profile");
    this.storage.remove("balance");
    this.storage.remove("token");
    this.storage.remove("school");
    this.storage.remove("company");
    this.storage.remove("firebase_token");
    this.storage.remove("tags");
    this.userService.sendTokenFcm('').then(() => { });
    this.navCtrl.navigateRoot("/login");
  }


  async changeLanguage() {
    const modal = await this.modalCtrl.create({
      component: ChangeLanguagePage
    });

    await modal.present();
  }
  async faq() {
    const modal = await this.modalCtrl.create({
      component: FaqPage
    });

    await modal.present();
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage
    });

    await modal.present();
  }

  getImgContent(): SafeUrl {
    var img;
    img = this.apiUrl + 'main_a/image/get/' + this.user.photoUrl + '/pas';
    return this.domSanitizer.bypassSecurityTrustUrl(img);

  }

}
