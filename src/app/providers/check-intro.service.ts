import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CheckIntroService implements CanLoad {
  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    return this.storage.get("did_intro").then((res) => {
      if (res) {
        this.router.navigate(["/login"]);
        return false;
      } else {
        return true;
      }
    });
  }
}
