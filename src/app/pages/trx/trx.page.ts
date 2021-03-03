import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/services/transaction.service";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { SheetStates } from "ionic-custom-bottom-sheet";
@Component({
  selector: "app-trx",
  templateUrl: "./trx.page.html",
  styleUrls: ["./trx.page.scss"],
})
export class TrxPage implements OnInit {
  transactions: any[];
  loadingComplete = false;
  today = new Date();
  month: string = "";
  year: string = "";
  saldoMasuk: number = 0;
  saldokeluar: number = 0;

  school: any;
  profile: any;
  public BottomSheetState: SheetStates = SheetStates.Closed;

  constructor(
    private _transaction: TransactionService,
    private alert: AlertService,
    private router: Router,
    private storage: Storage
  ) {
    this.month =
      (this.today.getMonth() < 10 ? "0" : "") + (this.today.getMonth() + 1);

    this.year = this.today.getFullYear().toString();

    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.storage.get("company").then((company) => {
      this.storage.get("profile").then((profile) => {
        this._transaction
          .getTransaction(
            this.month,
            this.year
          )
          .then(
            (response: any) => {
              this.transactions = response.body.content;
              var masuk = 0;
              var keluar = 0;

              for (var i = 0; i < this.transactions.length; i++) {

                var str = this.transactions[i].tags;
                var splitted = str.split(",");
                console.log(splitted);
                for (var j = 0; j < splitted.length; j++) {
                  console.log(splitted[j]);
                  if (splitted[j] == "topup" || splitted[j] == "TOPUP") {
                    masuk += this.transactions[i].amount * -1;
                    break;
                  }

                  if (this.transactions[i].tags[0] != "topup" || this.transactions[i].tags[0] != "TOPUP") {
                    keluar += this.transactions[i].amount * -1;
                    break;
                  }
                }
              }
              this.saldoMasuk = masuk;
              this.saldokeluar = keluar;
            },
            (error) => {
              this.alert.toastError(error);
            }
          );
      });
    });
  }
  updateFilter() {
    if (this.month != "" && this.year != "") {
      this.school = JSON.parse(localStorage.getItem("school"));
      this.profile = JSON.parse(localStorage.getItem("profile"));

      this.storage.get("company").then((company) => {
        this.storage.get("profile").then((profile) => {
          this._transaction
            .getTransaction(
              this.month,
              this.year
            )
            .then(
              (response: any) => {
                this.transactions = response.body.content;
                var masuk = 0;
                var keluar = 0;

                for (var i = 0; i < this.transactions.length; i++) {
                  if (this.transactions[i].tag === "TOPUP") {
                    masuk += this.transactions[i].amount * -1;
                  } else {
                    keluar += this.transactions[i].amount * -1;
                  }
                }
                this.saldoMasuk = masuk;
                this.saldokeluar = keluar;
              },
              (error) => {
                this.alert.toastError(error);
              }
            );
        });
      });
    }
  }

  viewDetail(month, year, tag, name) {
    let navigationExtras = {
      queryParams: {
        month: month,
        year: year,
        tag: tag,
        name: name,
      },
    };
    this.router.navigate(["trx-detail"], navigationExtras);
  }


  public OpenSheet() {
    this.BottomSheetState = SheetStates.Opened;
  }

  public StateChanged(event) {
    if (event == SheetStates.Closed) {
      console.log("Sheet Closed");
    }
  }
}
