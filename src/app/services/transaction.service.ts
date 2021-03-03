import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  constructor(private http: HttpService) { }

  getTransaction(from, year) {
    return this.http.get(
      "katalis/transaction/report" +
      "?month=" +
      from +
      "&year=" +
      year
    );
  }

  getTransactionDetail(month, year, name) {
    return this.http.get(
      "katalis/transaction/report/detail/" +
      "?month=" +
      month +
      "&year=" +
      year +
      "&transactionName=" +
      name
    );
  }
}
