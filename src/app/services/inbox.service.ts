import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class InboxService {
  constructor(private http: HttpService, private storage: Storage) { }

  getNotifications(start, limit) {
    return this.http.get(
      "katalis/notification?email=" +
      "&phone=" +
      "&page=" +
      start +
      "&size=" +
      limit +
      "&sort=createdTime,desc"
    );
  }

  getBroadcasts(start, limit, field, key = '') {
    var data = {
      "search": [
        // {
        //   "field": field,
        //   "key": key
        // }
      ]
    }

    return this.http.post_main_a("main_a/broadcast/get_broadcast", data);
  }
}
