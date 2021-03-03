import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/services/transaction.service";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-trx-detail",
  templateUrl: "./trx-detail.page.html",
  styleUrls: ["./trx-detail.page.scss"],
})
export class TrxDetailPage implements OnInit {
  transactions = [];
  month;
  year;
  tag;
  name;
  constructor(
    private _transaction: TransactionService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      // console.log(params);l

      if (params) {
        this.month = params.month;
        this.year = params.year;
        this.tag = params.tag;
        this.name = params.name;

        this.getData();
      }
    });
  }

  ngOnInit() { }

  getData() {
    this._transaction
      .getTransactionDetail(this.month, this.year, this.name)
      .then(
        (res: any) => {
          this.transactions = res.body.content;
          console.log(res);

        },
        (error) => {
          this.alert.toastError(error);
        }
      );
  }
}
