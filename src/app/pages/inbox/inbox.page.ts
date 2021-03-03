import { Component, OnInit, ViewChild } from "@angular/core";
import { InboxService } from "src/app/services/inbox.service";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { InboxDetailPage } from "../inbox-detail/inbox-detail.page";
import { BroadcastDetailPage } from "../broadcast-detail/broadcast-detail.page";
import { Storage } from '@ionic/storage';

import { environment } from 'src/environments/environment';
@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.page.html",
  styleUrls: ["./inbox.page.scss"],
})
export class InboxPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  segment = "notification";
  apiUrl = environment.API_URL;
  start: number = 0;
  limit: number = 10;
  notifications = [];
  broadcasts = [];
  profile: any;
  showNotification = false;
  showBroadcast = false;

  field: string = 'tags';
  key: string;

  constructor(
    private inbox: InboxService,
    private modalCtrl: ModalController,
    private storage: Storage) {
    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.inbox
      .getNotifications(this.start, this.limit)
      .then((notifications: any) => {
        setTimeout(() => {
          this.notifications = notifications.body.content;
          this.showNotification = true;
        }, 1000);
      });

    this.storage.get("profile").then(profile => {
      this.profile = profile;
      // console.log(this.profile.accounts[0].callerIdentities[0].tags);
      var callerIdentities = this.profile.accounts[0].callerIdentities;
      var temp = '';
      for (let ii = 0; ii < callerIdentities.length; ii++) {
        var tags = this.profile.accounts[0].callerIdentities[ii].tags;
        for (let i = 0; i < tags.length; i++) {
          temp += tags[i] + ",";
        }
      }

      this.inbox.getBroadcasts(this.start, this.limit, this.field, this.key).then((broadcasts: any) => {
        setTimeout(() => {
          this.broadcasts = broadcasts.content;
          this.showBroadcast = true;
        }, 1000);
      });
    })
  }

  loadData(event) {
    this.start += 1;

    this.inbox
      .getNotifications(this.start, this.limit)
      .then((notifications: any) => {
        for (let ii = 0; ii < notifications.body.content.length; ii++) {
          this.notifications.push(notifications.body.content[ii]);
        }

        event.target.complete();

        if (notifications.body.content.length < this.limit) {
          event.target.disabled = true;
        }
      });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async presentInboxDetail(inbox) {
    const modal = await this.modalCtrl.create({
      component: InboxDetailPage,
      componentProps: {
        inbox: inbox,
      },
    });

    await modal.present();
  }

  async presentBroadcastDetail(inbox) {
    const modal = await this.modalCtrl.create({
      component: BroadcastDetailPage,
      componentProps: {
        inbox: inbox,
      },
    });

    await modal.present();
  }
}
