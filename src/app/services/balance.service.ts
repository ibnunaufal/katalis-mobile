import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class BalanceService {
  constructor(private http: HttpService) {}

  getBalance(id: String) {
    return this.http.get("katalis/balance");
  }
}
