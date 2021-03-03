import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { AlertService } from "src/app/services/alert.service";
import { MutationService } from "src/app/services/mutation.service";
import { Storage } from '@ionic/storage';

import { SheetStates } from "ionic-custom-bottom-sheet";
@Component({
  selector: 'app-older-mutation',
  templateUrl: './older-mutation.page.html',
  styleUrls: ['./older-mutation.page.scss'],
})
export class OlderMutationPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  start = 0;
  limit = 10;
  mutations: any;
  school: any;
  profile: any;
  show = false;
  startDate;
  ends;

  public BottomSheetState: SheetStates = SheetStates.Closed;


  constructor(private mutation: MutationService,
    private alert: AlertService,
    private storage: Storage) {

  }

  ngOnInit() {
    this.getData(this.start, this.limit);
  }

  getData(start, limit) {

    this.mutation
      .getOlder(start, limit)
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
      .getOlder(
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
      .getOlder(
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

  public OpenSheet() {
    this.BottomSheetState = SheetStates.Opened;
  }

  public StateChanged(event) {
    if (event == SheetStates.Closed) {
      console.log("Sheet Closed");
    }
  }

  updateFilter() {
    if (this.startDate != "" && this.ends != "") {
      console.log(this.startDate)
      this.mutation
        .getMutation(
          this.start,
          this.limit,
          this.startDate,
          this.ends
        ).then((response: any) => {
          this.mutations = response.body.content;
        })
    }
  }
}
