import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { InboxService } from "src/app/services/inbox.service";
import { InboxDetailPage } from '../inbox-detail/inbox-detail.page';
import { BroadcastDetailPage } from '../broadcast-detail/broadcast-detail.page';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
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
    private modalCtrl: ModalController,
    private inbox: InboxService,
    private storage: Storage) { }

  ngOnInit() {
    this.getData()
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

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
