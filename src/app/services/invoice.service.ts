import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(public http: HttpService) {}

  getAll(start, limit) {
    return this.http.get(
      "katalis/invoice/all?callerId=&sort=invoiceDate,Desc" +
        "&page=" +
        start +
        "&size=" +
        limit
    );
  }
  getUnpaid(start, limit) {
    return this.http.get(
      "katalis/invoice/unpaid?sort=invoiceDate,Desc" +
        "&page=" +
        start +
        "&size=" +
        limit
    );
  }
  getPaid(start, limit) {
    return this.http.get(
      "katalis/invoice/paid?sort=invoiceDate,Desc" +
        "&page=" +
        start +
        "&size=" +
        limit
    );
  }
  payInvoice(id, amount, tag) {
    var data = {
      amount: amount,
      cash: true,
      channel: "MOBILE",
      invoiceId: id,
      tag: tag,
    };
    return this.http.post("katalis/transaction/invoice/payment", data);
  }
}
