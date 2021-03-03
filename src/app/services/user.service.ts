import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpService) { }

  getUser() {
    return this.http.get("katalis/user");
  }


  updateUser(data) {
    return this.http.put("katalis/user", data);
  }
  updateUserUnlimited(data) {
  
    return this.http.put("katalis/user", data);
  }
  tokenCheck() {
    return this.http.get("katalis/user/credential/check");
  }

  sendTokenFcm(token) {
    var data = {
      token: token
    }
    return this.http.put("katalis/user/firebase/token", data);
  }
}
