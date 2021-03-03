import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  token: any;

  constructor(private http: HttpService) { }

  // login(username: String, password: String) {
  //   let data = {
  //     username: username,
  //     password: password,
  //   };

  //   return this.http
  //     .post(environment.API_URL + "login", data, { observe: "response" })
  //     .pipe(
  //       timeout(environment.TIMEOUT),
  //       catchError(this.error.handleError),
  //       tap((response) => {
  //         this.storage
  //           .set(
  //             "token",
  //             response.headers.get("Authorization").replace("Bearer ", "")
  //           )
  //           .then(() => {
  //             this.token = response.headers
  //               .get("Authorization")
  //               .replace("Bearer ", "");

  //             this.authState.next(true);

  //             return this.token;
  //           });
  //       })
  //     );
  // }

  login(username: String, password: String) {
    let data = {
      username: username,
      password: password
    };

    return this.http.login(data);
  }

  loginPy(username: String, password: String) {
    let data = {
      username: username,
      password: password
    };

    return this.http.login_academic(data);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  get tokenCheck() {
    return this.http.get("katalis/user/credential/check");
  }

  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.put("katalis/sso/credential/change", data);
  }

  createPassword(data) {
    return this.http.putCreatePass("katalis/sso/credential/create", data);
  }

  forgetPassword(email, otp, password) {
    let data = {
      "newPassword": password,
      "otp": otp,
      "phoneEmail": email
    }
    return this.http.putForgetPass("katalis/sso/credential/forget", data);
  }
  forgetPasswordOtp(email, otp, password) {
    let data = {
      "newPassword": password,
      "otp": otp,
      "phoneEmail": email
    }
    return this.http.postForgetPass("katalis/sso/credential/forget", data);
  }
}
