import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  constructor(private http: HttpService, private storage: Storage) { }

  get messages() {
    return this.storage.get("imei").then((deviceId) => {
      return this.http.get_py("main_a/chat/chatlist/" + deviceId);
    })
  }

  sendMessage(message) {
    return this.storage.get("profile").then((profile) => {
      return this.storage.get("imei").then((deviceId) => {
        return this.storage.get("firebase_token").then((token) => {
          let data = {
            firebaseId: token,
            message: message,
            deviceId: deviceId,
            writeName: profile.name
          };

          return this.http.post("main_a/tiket/sendchat/login/Mobile", data);
        });
      });
    })
  }

  sendMessageUnlogin(message) {
    return this.storage.get("imei").then((deviceId) => {
      return this.storage.get("firebase_token").then((token) => {
        let data = {
          firebaseId: token,
          message: message,
          deviceId: deviceId
        };

        return this.http.post_main_a("main_a/chat/sendchat/unlogin/Mobile/" + environment.COMPANYID, data);
      });
    })
  }
}
