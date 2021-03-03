import { Component, ViewChildren, QueryList, ViewChild } from "@angular/core";

import {
  Platform,
  ModalController,
  ActionSheetController,
  PopoverController,
  IonRouterOutlet,
  AlertController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TopupPage } from "./pages/topup/topup.page";
import { InvoicePage } from "./pages/invoice/invoice.page";
import { AuthenticationService } from "./services/authentication.service";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { TopupHistoryPage } from "./pages/topup-history/topup-history.page";
import { AlertService } from "./services/alert.service";
import { FcmService } from "./services/fcm.service";
import { tap } from "rxjs/operators";
import { GlobalObservableService } from "./services/global-observable.service";
import { Storage } from '@ionic/storage';
import { TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateConfigService } from './translate-config.service';
import { NetworkService } from './services/network.service';
// import { ImageLoaderConfig } from 'ionic-image-loader';
import { HttpHeaders } from '@angular/common/http';
import { InboxDetailPage } from './pages/inbox-detail/inbox-detail.page';
import { UidService } from './services/uid.service';
import { NotificationDetailPage } from './pages/notification-detail/notification-detail.page';
import { fromEvent } from "rxjs";
import { Location } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  // @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  dark = false;
  selectedLanguage: string;
  navLinksArray = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private authentication: AuthenticationService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private alert: AlertService,
    private fcm: FcmService,
    private alertCtrl: AlertController,
    private globalObservable: GlobalObservableService,
    private storage: Storage,
    private translateConfigService: TranslateConfigService,
    private network: NetworkService,
    private uid: UidService,
    private location: Location
    // private imageLoaderConfig: ImageLoaderConfig
  ) {
    this.initializeApp();
    // disable spinners by default, you can add [spinner]="true" to a specific component instance later on to override this
    // imageLoaderConfig.enableSpinner(false);

    // // set the maximum concurrent connections to 10
    // this.storage.get('token').then(token => {
    //   imageLoaderConfig.setConcurrency(10);
    //   const headers = new HttpHeaders()
    //     .set("Authorization", "Bearer" + token);
    //   this.imageLoaderConfig.setHttpHeaders(headers);
    // })
    this.backButtonEvent()

    // this.router.events.subscribe(event => {
    //   const url = this.router.url //current url
    //   if (event instanceof NavigationEnd) {
    //     const isCurrentUrlSaved = this.navLinksArray.find((item) => { return item === url });
    //     if (!isCurrentUrlSaved) this.navLinksArray.push(url);
    //   }// end event if stmt
    // }) // end subscribe
    // this.hardwareBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      // this.sessionCheck();
      // this.backButtonEvent();
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

      this.fcm.getToken();


      this.uid.getPermission();
      this.uid.getID_UID('IMEI');

      this.network.getStatus();

      if (!this.platform.is("mobileweb")) {
        // Listen to incoming messages
        this.fcm
          .listenToNotifications()
          .pipe(
            tap((msg) => {
              let type;

              if (msg.type != "ticket") {
                if (msg.type == "invoice") {
                  type = "tagihan";
                  this.router.navigate(["/app"]);
                } else if (msg.type == "news") {
                  type = "berita";
                } else if (msg.type == "syllabus") {
                  type = "pesan silabus";
                } else {
                  type = "pesan";
                }
                this.presentNotification(msg);
                this.showMessage(type);
              } else {
                this.globalObservable.publish({
                  label: "chat:got",
                  value: msg,
                });

                if (
                  this.router.url != "/app/tabs/home/support" &&
                  this.router.url != "/support-app"
                ) {
                  type = "pesan";

                  this.showMessage(type);
                }
              }
            })
          )
          .subscribe((data) => {
            // alert(JSON.stringify(data.content));
            // if (data.tap) {
            //   if (data.type == 'invoice') {
            //     let InvoiceDetailModal = this.modalCtrl.create(
            //       'InvoiceDetailModalPage',
            //       {
            //         invoiceId: JSON.parse(data.content).id
            //       }
            //     );
            //     InvoiceDetailModal.present();
            //   } else if (data.type == 'news') {
            //     let NewsDetailModal = this.modalCtrl.create(
            //       'NewsDetailModalPage',
            //       {
            //         news: JSON.parse(data.content)
            //       }
            //     );
            //     NewsDetailModal.present();
            //   } else {
            //     let inboxDetailModal = this.modalCtrl.create(
            //       'InboxDetailModalPage',
            //       {
            //         inbox: JSON.parse(data.content)
            //       }
            //     );
            //     inboxDetailModal.present();
            //   }
            //   // } else {
            //   //   const toast = _toast.create({
            //   //     message: data.body,
            //   //     duration: 3000
            //   //   });
            //   //   toast.present();
            // }
          });
      }
    });
  }

  sessionCheck() {
    this.authentication.tokenCheck.then(
      (res) => {
        if (res) this.router.navigateByUrl("/app");
        else this.router.navigateByUrl("/");
      },
      (err) => {
        this.router.navigateByUrl("/");
      }
    );
  }

  async presentTopup() {
    const modal = await this.modalCtrl.create({
      component: TopupPage,
    });

    await modal.present();
  }

  async presentNotification(inbox) {
    const modal = await this.modalCtrl.create({
      component: NotificationDetailPage,
      componentProps: {
        inbox: inbox,
      },
    });

    await modal.present();
  }


  async presentInvoice() {
    const modal = await this.modalCtrl.create({
      component: InvoicePage,
    });

    await modal.present();
  }
  async presentTopupHistory() {
    const modal = await this.modalCtrl.create({
      component: TopupHistoryPage,
    });

    await modal.present();
  }

  async showMessage(type) {
    if (type == "tagihan") {
      this.presentInvoice();
    } else {
      const alrt = await this.alertCtrl.create({
        header: "Pesan",
        message: "Anda memiliki 1 " + type + " baru.",
        buttons: ["OK"],
      });

      await alrt.present();
    }
  }

  // backButtonEvent() {
  //   this.platform.backButton.subscribeWithPriority(0, async () => {
  //     try {
  //       const element = await this.actionSheetCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) { }

  //     try {
  //       const element = await this.popoverCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) { }

  //     try {
  //       const element = await this.modalCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) { }

  //     // try {
  //     //   const element = await this.menuCtrl.getOpen();
  //     //   if (element !== null) {
  //     //     this.menuCtrl.close();
  //     //     return;
  //     //   }
  //     // } catch (error) {}

  //     this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //       if (!outlet.canGoBack()) {
  //         navigator["app"].exitApp();
  //       }
  //       // console.log(outlet);

  //       // if (outlet && outlet.canGoBack()) {
  //       //   outlet.pop();

  //       // }
  //       // else if (this.router.url === "/app/tabs/home") {
  //       //   navigator['app'].exitApp();
  //       // }
  //       // else {
  //       //   if (
  //       //     new Date().getTime() - this.lastTimeBackPress <
  //       //     this.timePeriodToExit
  //       //   ) {
  //       //     navigator["app"].exitApp();
  //       //   } else {
  //       //     this.alert.toast("Tekan tombol back sekali lagi untuk keluar.");

  //       //     this.lastTimeBackPress = new Date().getTime();
  //       //   }
  //       // }
  //     });
  //   });
  // }

  // hardwareBackButton() {
  //   this.platform.backButton.subscribe(() => {
  //     if (this.navLinksArray.length > 1) {
  //       this.navLinksArray.pop();
  //       const index = this.navLinksArray.length + 1;
  //       const url = this.navLinksArray[index];
  //       this.router.navigate([url])
  //       console.log(url);

  //     }
  //   }) // end subscription
  // } // end back button fn

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {

      if (!this.routerOutlet.canGoBack()) {
        if (this.router.url === "/app/tabs/home") {
          this.backButtonAlert()
        } else if (this.router.url === "/login") {
          navigator["app"].exitApp();
        } else {
          this.location.back()
        }
      } else {
        this.location.back()
      }

    })
  }

  async backButtonAlert() {
    if (
      new Date().getTime() - this.lastTimeBackPress <
      this.timePeriodToExit
    ) {
      navigator["app"].exitApp();
    } else {
      this.alert.toast("Tekan tombol kembali sekali lagi untuk keluar.");

      this.lastTimeBackPress = new Date().getTime();
    }
  }
}
