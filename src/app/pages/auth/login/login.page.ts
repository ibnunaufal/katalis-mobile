import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { BalanceService } from "src/app/services/balance.service";
import { GlobalObservableService } from "src/app/services/global-observable.service";
import { LoadingService } from "src/app/services/loading.service";
import { SupportAppPage } from "../../support-app/support-app.page";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { FcmService } from "src/app/services/fcm.service";
import { UserService } from 'src/app/services/user.service';
import { AcademicService } from 'src/app/services/academic.service';

import { TranslateConfigService } from 'src/app/translate-config.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from "@ionic-native/status-bar/ngx";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  validationForm: FormGroup;
  selectedLanguage: string;
  validationMessages = {
    username: [{ type: "required", message: "Username harap diisi." }],
    password: [{ type: "required", message: "Password harap diisi." }],
  };
  username;
  password;

  showPassword = false;
  passwordToggleIcon = "eye-outline";
  spinner = false;
  // user;
  constructor(
    private splashScreen: SplashScreen,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private authentication: AuthenticationService,
    private alertService: AlertService,
    public navCtrl: NavController,
    private balance: BalanceService,
    private globalObservable: GlobalObservableService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private router: Router,
    private data: DataService,
    private fcm: FcmService,
    private user: UserService,
    private translateConfigService: TranslateConfigService,
    private academic: AcademicService,
    private statusBar: StatusBar,
    private firebase: FcmService
  ) {

    this.firebase.getTokenUnLogin();
    this.statusBar.backgroundColorByHexString('#0054e6');

    this.storage.get('profile').then((profile: any) => {
      // console.log(profile);
      if (profile != null) {
        this.spinner = true;
        setTimeout(() => {
          this.user.tokenCheck().then((res: any) => {
            this.storage
              .set("company", res.body.activeCompany)
              .then(() => {
                this.fcm.subscribeToTopics();
              });
            //TODO: change to /app
            this.storage.get('lastService').then((response) => {
              if (response == "KATALIS") {
                this.navCtrl.navigateRoot("/app");
              } else if (response == "EDUCATION") {
                this.navCtrl.navigateRoot("/academic-home");
              } else {
                this.navCtrl.navigateRoot("/app");
              }
            })
          },
            (error) => {
              console.log(error);
              this.spinner = false;
            })

        }, 300);
      }
    })
    this.globalObservable.getObservable().subscribe(data => {
      if (data.label == "createpass:success") {
        this.username = data.value.body.email;
        this.password = '';
      }
      if (data.label == "test:got") {
        this.alertService.toastSuccess(data.value)
      }
    })

  }

  ngOnInit() {
    this.password = '';
    this.splashScreen.hide();
    this.validationForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  login(values) {
    if (this.validationForm.valid) {
      // this.loading.show();
      // this.academic.login(values.username, values.password).then(

      this.authentication.login(values.username, values.password).then(
        (response: any) => {
          console.log(response.body.user.lastService);
          this.fcm.getToken();
          this.storage.set('lastService', response.body.user.lastService).then(() => { })
          if (response.body.firstLogin) {
            // this.loading.hide();
            this.data.setData(response.body.user.id, response.body);
            this.router.navigateByUrl(
              "/create-password/" + response.body.user.id
            );
          } else {
            if (response.body.user.lastService == "KATALIS") {
              this.authentication.tokenCheck.then((check: any) => {
                // console.log(check.body.tags);
                this.storage
                  .set("profile", check.body.user)
                  .then((profile) => {
                    this.globalObservable.publish({
                      label: "profile:got",
                      value: profile,
                    });
                  });
                this.storage
                  .set("tags", check.body.tags)
                  .then(() => {
                    this.storage
                      .set("company", check.body.activeCompany)
                      .then(() => {
                        this.fcm.subscribeToTopics();
                      });
                  });

                this.balance.getBalance(check.body.user.accounts[0].id).then(
                  (balance: any) => {
                    this.storage.set("balance", balance.body.balance).then((res) => {
                      this.globalObservable.publish({
                        label: "balance:got",
                        value: res,
                      });
                    });
                  },
                  (error) => {
                    this.globalObservable.publish({
                      label: "balance:error",
                    });
                    this.alertService.toastError(error);
                  })
              })
              // this.loading.hide();
              // this.alertService.toastSuccess("Logged In.");
              // console.log('berhasil')
              //TODO: change to /app
              this.navCtrl.navigateRoot("/app");

            } else if (response.body.user.lastService == "EDUCATION") {
              //

              this.router.navigate(["/academic-home"]);

            } else {
              this.navCtrl.navigateRoot("/app");
            }

          }

          // if (response.body.firstLogin) {
          //   this.loading.hide();
          //   this.data.setData(response.body.user.id, response.body);
          //   this.router.navigateByUrl(
          //     "/create-password/" + response.body.user.id
          //   );
          // } else {
          //   this.storage
          //     .set("profile", JSON.stringify(response.user))
          //     .then((profile) => {
          //       this.globalObservable.publish({
          //         label: "profile:got",
          //         value: profile,
          //       });
          //     });
          //   this.storage
          //     .set("tags", JSON.stringify(response.body.tags))
          //     .then(() => {
          //       this.storage
          //         .set("company", JSON.stringify(response.body.activeCompany))
          //         .then(() => {
          //           this.fcm.subscribeToTopics();
          //         });
          //     });
          //   this.balance.getBalance(response.body.user.accounts[0].id).then(
          //     (res: any) => {
          //       this.storage.set("balance", res.body.balance).then((res) => {
          //         this.globalObservable.publish({
          //           label: "balance:got",
          //           value: res,
          //         });
          //       });
          //     },
          //     (error) => {
          //       this.globalObservable.publish({
          //         label: "balance:error",
          //       });
          //       this.alertService.toastError(error);
          //     }
          //   );

          //   this.loading.hide();
          //   this.alertService.toastSuccess("Logged In.");


          //   console.log('berhasil')
          //   //TODO: change to /app
          //   this.router.navigate(["/app"]);
          // }
        },
        (error) => {
          // this.loading.hide();
          this.alertService.alert(error);
        }
      );
    }
  }

  async presentSupport() {
    const modal = await this.modalCtrl.create({
      component: SupportAppPage,
    });

    await modal.present();
  }

  forgetPassword() {
    this.router.navigate(["/forget-password"]);
  }

  gotoSupport() {
    this.router.navigate(["/support-app"]);
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = "eye-outline";
    }
  }
  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  test() {
    this.globalObservable.publish({
      label: "test:got",
      value: 'tes',
    });
  }
}
