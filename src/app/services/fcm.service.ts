import { Injectable } from "@angular/core";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Firebase } from "@ionic-native/firebase/ngx";
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { throws } from 'assert';
import { AlertService } from './alert.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root",
})
export class FcmService {
  constructor(
    public firebaseNative: Firebase,
    private platform: Platform,
    private storage: Storage,
    private clipboard: Clipboard,
    private alert: AlertService,
    private userService: UserService
  ) { }

  async getToken() {
    let token;

    if (this.platform.is("android") && !this.platform.is("mobileweb")) {
      token = await this.firebaseNative.getToken();

    }

    if (this.platform.is("ios")) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    if (this.platform.is("mobileweb")) {
      token =
        "cgzEeMzMQyM:APA91bFvspmOChGyCuXN8hYYbQS6YFlnRknsj-q-4b37f_zvN8CHWydwldAaFieAHFVH2zcgEOm-W-0S_7o1EBXiIjLtLRkE4y-ke7cpcBh9ypkWhsQWpW7vGXLAh-TJfkmBySDQT4vj";
    }
    console.log(token);

    // return this.saveTokenToFirestore(token);

    return this.saveTokenToStorage(token);
  }

  async getTokenUnLogin() {
    let token;

    if (this.platform.is("android") && !this.platform.is("mobileweb")) {
      token = await this.firebaseNative.getToken();

    }

    if (this.platform.is("ios")) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    if (this.platform.is("mobileweb")) {
      token =
        "cgzEeMzMQyM:APA91bFvspmOChGyCuXN8hYYbQS6YFlnRknsj-q-4b37f_zvN8CHWydwldAaFieAHFVH2zcgEOm-W-0S_7o1EBXiIjLtLRkE4y-ke7cpcBh9ypkWhsQWpW7vGXLAh-TJfkmBySDQT4vj";
    }
    console.log(token);

    // return this.saveTokenToFirestore(token);

    return this.saveTokenToStorageUnLogin(token);
  }

  private saveTokenToStorage(token) {
    this.userService.sendTokenFcm(token).then(() => {
      this.storage.set("firebase_token", token).then(() => {
        // if (this.platform.is("android") && !this.platform.is("mobileweb")) {
        //   this.subscribeToTopics();
        // }
        this.clipboard.copy(token);
        // this.alert.toastSuccess('token copied');
      });
    })
  }

  private saveTokenToStorageUnLogin(token) {
    this.storage.set("firebase_token", token).then(() => {
    });
  }

  subscribeToTopics() {
    this.storage.get("tags").then((tags) => {
      this.storage.get("company").then((company) => {
        let companyCode = company.companyCode;
        let t = tags;
        console.log(tags.length);
        if (tags.length > 0) {
          for (var ii = 0; ii < tags.length; ii++) {
            this.firebaseNative
              .subscribe(
                companyCode + "-" + t[ii].replace(/\s/g, "").toLowerCase()
              )
              .then(() => { });
          }
        }
      });
    });
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
