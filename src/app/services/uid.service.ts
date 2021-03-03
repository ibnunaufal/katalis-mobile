import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class UidService {

  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private storage: Storage
  ) { }

  getPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      console.log(res);

      if (res.hasPermission) {

      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          console.log(error);

          alert("Error! " + JSON.stringify(error));
        });
      }
    }).catch(error => {
      console.log(error);
      alert("Error! " + JSON.stringify(error));
    });
  }

  getID_UID(type) {
    if (type == "IMEI") {
      if (this.platform.is("android") && !this.platform.is("mobileweb")) {
        this.storage.set('imei', this.uid.IMEI).then((res) => {
          return this.uid.IMEI;
        })
      } else if (this.platform.is("mobileweb")) {
        this.storage.set('imei', '123456789').then((res) => {
          return this.uid.IMEI;
        })
      }

    } else if (type == "ICCID") {
      return this.uid.ICCID;
    } else if (type == "IMSI") {
      return this.uid.IMSI;
    } else if (type == "MAC") {
      return this.uid.MAC;
    } else if (type == "UUID") {
      return this.uid.UUID;
    }
  }
}
