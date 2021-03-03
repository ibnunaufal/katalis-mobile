import { Injectable } from "@angular/core";
import * as moment from "moment";
import { HttpService } from "./http.service";
@Injectable({
  providedIn: "root",
})
export class MutationService {
  fromDate = moment().subtract(30, "days").format("DD-MM-YYYY");
  today = moment().format("DD-MM-YYYY");

  fromDateOlder = "01-01-2020";
  toDateOlder = moment().subtract(31, "days").format("DD-MM-YYYY");

  constructor(private http: HttpService) { }

  getLast30Days(start, limit) {
    return this.http.get(
      "katalis/balance/mutation?date=" +
      this.fromDate +
      "/" +
      this.today +
      "&coa=21-200&page=" + start + "&size=" + limit + "&sort=dateTime,desc"
    );
  }

  getOlder(start, limit) {
    return this.http.get(
      "katalis/balance/mutation?date=" +
      this.fromDateOlder +
      "/" +
      this.toDateOlder +
      "&coa=21-200&page=" + start + "&size=" + limit + "&sort=dateTime,desc"
    );
  }

  getMutation(start, limit, startDate, ends) {
    return this.http.get(
      "katalis/balance/mutation?date=" +
      moment(startDate).format("DD-MM-YYYY") +
      "/" +
      moment(ends).format("DD-MM-YYYY") +
      "&coa=21-200&page=" + start + "&size=" + limit + "&sort=dateTime,desc"
    );
  }
}
