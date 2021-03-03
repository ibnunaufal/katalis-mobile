import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";
import { PrintService } from '../../services/print.service';
import { UserService } from "src/app/services/user.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"]
})
export class AccountPage implements OnInit {
  image = "../"
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  apiUrl = environment.API_URL;
  accountsLoaded = false;
  accountsError = false;
  accounts = [];
  bluetoothList: any = [];
  selectedPrinter: any;
  data: any;
  constructor(private storage: Storage,
    private print: PrintService,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private alertService: AlertService,) {
    this.getAccounts();
  }

  ngOnInit() {

  }

  getAccounts() {
    this.accountsLoaded = false;
    this.accountsError = false;
    this.accounts = [];

    this.storage.get("profile").then((profile: any) => {
      this.accountsLoaded = true;
      this.accountsError = false;
      let u = profile;
      this.accounts = u.accounts[0].callerIdentities;
    });
  }

  doRefresh(event) {
    this.accountsLoaded = false;
    this.accountsError = false;
    this.accounts = [];

    this.storage.get("profile").then((profile: any) => {
      this.accountsLoaded = true;
      this.accountsError = false;
      let u = JSON.parse(profile);
      this.accounts = u.accounts[0].callerIdentities;

      event.target.complete();
    });
  }

  //This will list all of your bluetooth devices
  listPrinter() {
    this.print.searchBluetoothPrinter()
      .then(resp => {

        //List of bluetooth device list
        this.bluetoothList = resp;
      });
  }
  //This will store selected bluetooth device mac address
  selectPrinter(macAddress) {
    //Selected printer macAddress stored here
    this.selectedPrinter = macAddress;
  }

  //This will print
  printStuff() {
    //The text that you want to print
    var myText = "<center>halo ini test</center><br><br><img src='..' width=100> <br>Hello hello hello \n\n\n This is a test \n\n\n";
    this.print.sendToBluetoothPrinter(this.selectedPrinter, myText);
  }
  getImgContent(img): SafeUrl {

    img = this.apiUrl + 'main_a/image/get/' + img + '/pas';
    return this.domSanitizer.bypassSecurityTrustUrl(img);

  }
}
