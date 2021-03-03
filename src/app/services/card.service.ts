import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private http: HttpService) { }

  getCard(start, limit) {
    return this.http.get(
      "katalis/card" +
      "?key=&page=" +
      start +
      "&size=" +
      limit +
      "&sort=createdTime,desc"
    );
  }

  updateCard(id, data) {
    return this.http.put("katalis/card/" + id, data)
  }
}
