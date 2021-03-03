import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class InfoService {
  constructor(private http: HttpService) { }

  getAll(start, limit, field, key = '') {
    var data = {
      "search": [
        // {
        //   "field": field,
        //   "key": key
        // }
      ]
    }
    return this.http.post_main_a("main_a/info/get_info", data);
  }
}
