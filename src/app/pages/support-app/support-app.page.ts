import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { ModalController, IonContent } from "@ionic/angular";
import { TicketService } from "src/app/services/ticket.service";
import { Storage } from "@ionic/storage";
import { GlobalObservableService } from "src/app/services/global-observable.service";


@Component({
  selector: "app-support-app",
  templateUrl: "./support-app.page.html",
  styleUrls: ["./support-app.page.scss"],
})
export class SupportAppPage implements OnInit {
  // @ViewChild("content", { static: true }) private content: any;
  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;

  messages: any = [];
  message: string = "";
  token: string;
  myInterval;

  constructor(
    private modalCtrl: ModalController,
    private ticket: TicketService,
    private storage: Storage,
    private globalObservable: GlobalObservableService,
    private zone: NgZone,
  ) {
    this.getData();

    this.storage.get("firebase_token").then((token) => {
      this.token = token;
    });

    this.globalObservable.getObservable().subscribe((data) => {
      if (data.label == "chat:got") {
        this.getData2();
        this.refresh()
      }
    });

    this.myInterval = setInterval(() => {
      this.storage.get("msgs").then((messages) => {
        this.messages = messages;
      });
    }, 3000);
  }

  ngOnInit() { }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

  getData() {
    this.ticket.messages.then((response: any) => {
      this.storage.set("msgs", response.message);
      this.messages = response.message;

      this.autoscroll();
    });
  }

  getData2() {
    this.ticket.messages.then((response: any) => {
      this.storage.set("msgs", response.message);

      setTimeout(() => {
        this.autoscroll();
      }, 2000);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getClasses(writerName) {

    return {
      outgoing: writerName != "ADMIN",
      incoming: writerName == "ADMIN",
    };
  }

  sendMessage() {
    if (this.message) {
      this.ticket.sendMessageUnlogin(this.message).then((response) => {
        this.messages.push(response);
        this.storage.set("msgs", this.messages);
        this.message = "";
        this.autoscroll();
      });
    }
  }

  ionViewWillLeave() {
    clearInterval(this.myInterval);
  }

  // updateScroll() {
  //   this.content.scrollToBottom(300);
  //   console.log("scroll");
  // }

  autoscroll() {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 1000);
  }
}
