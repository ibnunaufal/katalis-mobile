import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { TicketService } from "src/app/services/ticket.service";
import { Storage } from "@ionic/storage";
import { GlobalObservableService } from "src/app/services/global-observable.service";

@Component({
  selector: "app-support",
  templateUrl: "./support.page.html",
  styleUrls: ["./support.page.scss"],
})
export class SupportPage implements OnInit {
  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;

  messages: any = [];
  message: string = "";
  tmpMsgs: any = [];
  token: string;
  myInterval;

  constructor(
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
      if (data.label == "msg:got") {
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

  getData() {
    this.ticket.messages.then((response: any) => {
      this.messages = response.message;
      this.storage.set("msgs", response.message);

      this.autoscroll();
    });
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
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

  getClasses(writerName) {

    return {
      outgoing: writerName != "ADMIN",
      incoming: writerName == "ADMIN",
    };
  }

  sendMessage() {
    if (this.message) {
      this.ticket.sendMessage(this.message).then((response) => {
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

  autoscroll() {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 1000);
  }
}
