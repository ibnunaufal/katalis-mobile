import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class VaService {
  constructor(private http: HttpService) { }

  getVas() {
    return this.http.get("katalis/user/va");
  }

  createVa(bank) {
    return this.http.post("katalis/bni/ecoll/create/va/open/" + bank, null);
  }

  getVaHistories(start: Number, limit: Number) {
    return this.http.get(
      "katalis/transaction/report/tag/topup" +
      "?sort=" +
      "&page=" +
      start +
      "&size=" +
      limit
    );
  }
}
