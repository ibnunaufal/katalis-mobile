import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { AlertService } from "src/app/services/alert.service";
import { MutationService } from "src/app/services/mutation.service";
import { TopupHistoryPageRoutingModule } from '../../topup-history/topup-history-routing.module';
import { ThrowStmt } from '@angular/compiler';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-last30-mutation',
  templateUrl: './last30-mutation.page.html',
  styleUrls: ['./last30-mutation.page.scss'],
})
export class Last30MutationPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  start = 0;
  limit = 10;
  mutations: any;
  school: any;
  profile: any;
  show = false;

  constructor(
    private mutation: MutationService,
    private alert: AlertService,
    private storage: Storage) {

  }


  ngOnInit() {
    this.getData(this.start, this.limit);
  }

  getData(start, limit) {
    this.mutation
      .getLast30Days(start, limit)
      .then(
        (response: any) => {
          this.mutations = response.body.content;
          this.show = true;
        },
        (error) => {
          this.alert.toastError(error);
        }
      );
  }

  loadData(event) {
    this.start += 1;
    this.mutation
      .getLast30Days(
        this.start,
        this.limit
      )
      .then(
        (response: any) => {
          for (let ii = 0; ii < response.body.content.length; ii++) {
            this.mutations.push(response.body.content[ii]);
          }

          if (response.body.content.length < this.limit) {
            event.target.disabled = true;
          } else {
            event.target.complete();
          }
        },
        (error) => {
          this.alert.alert(error);
        }
      );
  }

  doRefresh(event) {
    this.start = 0;
    this.infiniteScroll.disabled = false;
    this.mutation
      .getLast30Days(
        this.start,
        this.limit
      )
      .then(
        (response: any) => {
          this.mutations = response.body.content;
          event.target.complete();
        },
        (error) => {
          this.alert.alert(error);

          event.target.complete();
        }
      );
  }

}
