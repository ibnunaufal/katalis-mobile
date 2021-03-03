import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class DataResolverService implements Resolve<any> {
  constructor(private data: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get("id");
    return this.data.getData(id);
  }
}
