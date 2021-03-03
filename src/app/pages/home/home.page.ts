import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonSlides, ModalController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { BalanceService } from "src/app/services/balance.service";
import { GlobalObservableService } from "src/app/services/global-observable.service";
import { environment } from "src/environments/environment";
import { TopupPage } from "../topup/topup.page";
import { AuthenticationService } from "src/app/services/authentication.service";
import { FcmService } from "src/app/services/fcm.service";
import { TopupHistoryPage } from '../topup-history/topup-history.page';
import { NotificationPage } from '../notification/notification.page';
import { ScrollDetail } from '@ionic/core';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { InfoService } from "src/app/services/info.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { InfoDetailPage } from '../info-detail/info-detail.page';
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  customProgressBar(current: any, total: any) {
    throw new Error('Method not implemented.');
  }

  @ViewChild('sliderHeadline', { static: false }) sliderHeadline: IonSlides;

  showToolbar = false;
  showToolbarAgain = false;
  showTop = false;
  showTopAgain = false
  temp = 0;

  headlineData: any;

  sliderheadline = {
    initialSlide: 1,
    slidesPerView: 1.1,
    loop: false,
    centeredSlides: true,
    spaceBetween: 0,
    autoPlay: false,
    speed: 400
  };

  balance: String;
  profile: any;
  balanceLoaded = false;
  balanceError = false;
  balanceLoadingTpl;
  apiUrl = environment.API_URL;
  backButtonSubscription;

  topMenu = [
    {
      name: "HOME.topup",
      active: true,
      page: "/topup",
      icon: "md-topup"
    },
    {
      name: "HOME.invoice",
      active: true,
      page: "/app/tabs/home/invoice",
      icon: "md-invoice"
    }, {
      name: "HOME.mutation",
      active: true,
      page: "/app/tabs/home/mutation",
      icon: "md-mutation"
    }, {
      name: "EdMedia",
      active: true,
      page: "/academic-home",
      icon: "md-edmedia"
    },
  ];
  menus = [
    {
      name: "HOME.account",
      active: true,
      page: "/app/tabs/home/account",
      icon: "md-account-new",
      class: "menu1"
    },
    {
      name: "HOME.digital",
      active: true,
      page: "/app/tabs/home/card",
      icon: "md-card-new",
      class: "menu2"
    },
    {
      name: "HOME.transaction",
      active: true,
      page: "/app/tabs/home/trx",
      icon: "md-transaction-new",
      class: "menu1"
    },
    {
      name: "HOME.donation",
      active: true,
      page: "/app/tabs/home/donation",
      icon: "md-donation-new",
      class: "menu1"
    },
    {
      name: "HOME.attendance",
      active: true,
      page: "/app/tabs/home/attendance",
      icon: "md-attendance-new",
      class: "menu1"
    },

    // {
    //   name: "HOME.service",
    //   active: true,
    //   page: "/app/tabs/home/support",
    //   icon: "md-services-new",
    //   class: "menu2"
    // },
    {
      name: "HOME.access",
      active: true,
      page: "/app/tabs/home/smart-access",
      icon: "md-smart-access",
      class: "menu3"
    },
    {
      name: "HOME.support",
      active: true,
      page: "/app/tabs/home/support",
      icon: "md-cs-new",
      class: "menu1"
    },
  ];
  company: any;
  constructor(
    private globalObservable: GlobalObservableService,
    private balanceService: BalanceService,
    private auth: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private info: InfoService,
    private storage: Storage,
    private modalCtrl: ModalController, private platform: Platform,
    private domSanitizer: DomSanitizer,
    private fcm: FcmService,
  ) {
    // this.globalObservable.getObservable().subscribe(data => {
    //   if (data.label = "balance:reload") {
    //     this.getBalance();
    //   }
    // })


    this.auth.tokenCheck.then((res: any) => {
      this.storage
        .set("profile", res.body.user)
        .then((profile) => {
          this.globalObservable.publish({
            label: "profile:got",
            value: profile,
          });
        });
      this.storage
        .set("tags", res.body.tags)
        .then(() => {
          this.storage
            .set("company", res.body.activeCompany)
            .then(() => {
              this.fcm.subscribeToTopics();
            });
        });

      this.storage.get("profile").then(profile => {
        this.profile = profile;
        this.storage.get("company").then(company => {
          this.company = company.name
          console.log("company " + JSON.stringify(this.company))
        })
      });

      this.getBalance();
      this.headline();
    })
    this.globalObservable.getObservable().subscribe(data => {
      // console.log(data);

      if (data.label == "balance:got") {
        this.balanceError = false;
        this.balance = data.value;
        this.balanceLoaded = true;
      }
      if (data.label == "balance:reload") {
        this.balanceError = false;
        this.getBalance();
        this.balanceLoaded = true;
      }

      if (data.label == "balance:error") {
        this.balanceError = true;
        this.balanceLoaded = true;
      }

      if (data.label == "profile:got") {
        this.profile = data.value
      }
      if (data.label == "sso:change") {
        // console.log('token change');
        setTimeout(() => {
          this.auth.tokenCheck.then((res: any) => {
            this.storage
              .set("profile", res.body.user)
              .then((profile) => {
                this.globalObservable.publish({
                  label: "profile:got",
                  value: profile,
                });
              });
            this.getBalance();
          })

        }, 500);
      }
      if (data.label == "profile:change") {
        this.storage.get("profile").then(
          profile => {
            this.profile = profile;
          },
          err => {
            this.alertService.toastError(err);
          })
      }
    });

    this.storage
      .get("balance")
      .then(balance => {
        let b = balance;
        if (b != null) {
          this.balance = b;
          // console.log(true)
        } else {
          this.balanceError = true;
        }

        this.balanceLoaded = true;
      })
      .catch(() => {
        this.balanceError = true;
      });

  }

  ngOnInit() {
    this.storage
      .get("balance")
      .then(balance => {
        let b = balance;
        // console.log('balance');

        // console.log(b);

        if (b != null) {
          this.balance = b;
          // console.log(true)
        } else {
          this.balanceError = true;
        }

        this.balanceLoaded = true;
      })
      .catch(() => {
        this.balanceError = true;
      });

    this.storage.get("profile").then(profile => {
      this.profile = profile;
    });

  }

  ngAfterViewInit() {
    // console.log(this.router.url);

    // if (this.router['routerState'].snapshot.url == '/app/tabs/home') {
    //   this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    //     navigator['app'].exitApp();
    //   });

    // }
  }

  ngOnDestroy() {
    // if (this.router['routerState'].snapshot.url == '/app/tabs/home') {
    //   this.backButtonSubscription.unsubscribe();
    // }
  }

  getBalance() {

    this.balanceLoaded = false;
    this.balanceService.getBalance(this.profile.accounts[0].id).then(
      (res: any) => {
        // console.log(res);
        this.storage.set("balance", res.body.balance);
        this.globalObservable.publish({
          label: "balance:got",
          value: res.body.balance
        });
      },
      error => {
        this.globalObservable.publish({
          label: "balance:error"
        });

        this.alertService.toastError(error);
      }
    );
  }

  openPage(page) {
    if (page.active) {
      this.router.navigate([page.page]);
    } else {
      return false;
    }
  }

  async presentTopup() {
    const modal = await this.modalCtrl.create({
      component: TopupPage
    });

    await modal.present();
  }


  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage
    });

    await modal.present();
  }


  async presentNotification() {
    const modal = await this.modalCtrl.create({
      component: NotificationPage
    });

    await modal.present();
  }

  async presentHistoryTopup() {
    const modal = await this.modalCtrl.create({
      component: TopupHistoryPage
    });

    await modal.present();
  }

  doRefresh(event) {

    // console.log('Begin async operation');
    this.getBalance();
    // console.log('Async operation has ended');
    event.target.complete();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {

    if ($event && $event.detail && $event.detail.scrollTop) {

      const scrollTop = $event.detail.scrollTop;
      if (this.temp == 0) {
        this.temp = scrollTop;
      }
      this.showToolbar = scrollTop >= 28;
      this.showToolbarAgain = this.temp > scrollTop;

      this.showTop = scrollTop >= 0;
      this.showTopAgain = this.temp > scrollTop;
      this.temp = scrollTop;
    } else {
      // console.log('down');
    }
  }

  getImgContent(image): SafeUrl {
    var img;
    img = this.apiUrl + 'main_a/image/get/' + image + '/pas';
    return this.domSanitizer.bypassSecurityTrustUrl(img);

  }


  headline() {
    this.info.getAll(0, 5, '', '').then(
      (res: any) => {
        var temp = [];
        for (var i = 0; i < res.content.length; i++) {
          if (res.content[i].isHeadline) {
            temp.push(res.content[i])
          }
          console.log("i " + i);

        }
        console.log(this.temp);
        this.headlineData = temp;

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



}
