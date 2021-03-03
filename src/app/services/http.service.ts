import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { timeout, catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private header: HeaderService,
    private http: HttpClient,
    private error: ErrorService,
    private storage: Storage
  ) { }

  get(url) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        const httpOptions = {
          headers: headers,
          observe: 'response' as 'response'
        };
        this.http
          .get(environment.API_URL + url, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            this.storage
              .set(
                "token",
                response.headers.get("Authorization").replace("Bearer ", "")
              )
              .then(() => {
                // this.token = data.headers
                //   .get("Authorization")
                //   .replace("Bearer ", "");

                // this.authState.next(true);

                resolve(response);
              });
          }, reject);
      });
    });
  }

  getPreview(url) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        this.http
          .get(url)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  get_py(url) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders_academic().then((headers) => {
        const httpOptions = {
          headers: headers,
          observe: 'response' as 'response'
        };
        this.http
          .get(environment.API_URL_PY + url, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  get_academic(url) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders_academic().then((headers) => {
        const httpOptions = {
          headers: headers,
          observe: 'response' as 'response'
        };
        this.http
          .get(environment.API_URL_ACADEMIC + url, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  get_academic_sso(url) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        const httpOptions = {
          headers: headers,
          observe: 'response' as 'response'
        };
        this.http
          .get(environment.API_URL_ACADEMIC + url, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            this.storage
              .set(
                "token",
                response.body.token.replace("Bearer ", "")
              )
              .then(() => {
                // this.token = data.headers
                //   .get("Authorization")
                //   .replace("Bearer ", "");

                // this.authState.next(true);

                resolve(response);
              });
          }, reject);
      });
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        this.http
          .post(environment.API_URL + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            this.storage
              .set(
                "token",
                response.headers.get("Authorization").replace("Bearer ", "")
              )
              .then(() => {
                // this.token = data.headers
                //   .get("Authorization")
                //   .replace("Bearer ", "");

                // this.authState.next(true);

                resolve(response);
              });
          }, reject);
      });
    });
  }

  post_academic(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders_academic().then((headers) => {
        this.http
          .post(environment.API_URL_ACADEMIC + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  post_main_a(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders_academic().then((headers) => {
        this.http
          .post(environment.API_URL + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        this.http
          .put(environment.API_URL + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            this.storage
              .set(
                "token",
                response.headers.get("Authorization").replace("Bearer ", "")
              )
              .then(() => {
                // this.token = data.headers
                //   .get("Authorization")
                //   .replace("Bearer ", "");

                // this.authState.next(true);

                resolve(response);
              });
          }, reject);
      });
    });
  }

  putCreatePass(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders().then((headers) => {
        this.http
          .put(environment.API_URL + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            console.log('response:');

            console.log(response);
            this.storage
              .set(
                "token",
                response.headers.get("Authorization").replace("Bearer ", "")
              )
              .then(() => {
                // this.token = data.headers
                //   .get("Authorization")
                //   .replace("Bearer ", "");

                // this.authState.next(true);
                resolve(response);
              });
          }, reject);
      });
    });
  }

  putForgetPass(url, data) {
    return new Promise((resolve, reject) => {
      // this.header.getHeaders().then((headers) => {
      this.http
        .put(environment.API_URL + url, data, {
          observe: "response",
        })
        .pipe(
          timeout(environment.TIMEOUT),
          catchError(this.error.handleError)
        )
        .subscribe((response: any) => {
          console.log('response:');

          console.log(response);
          // this.storage
          //   .set(
          //     "token",
          //     response.headers.get("Authorization").replace("Bearer ", "")
          //   )
          //   .then(() => {
          // this.token = data.headers
          //   .get("Authorization")
          //   .replace("Bearer ", "");

          // this.authState.next(true);
          resolve(response);
          // });
        }, reject);
    });
    // });
  }

  postForgetPass(url, data) {
    return new Promise((resolve, reject) => {
      // this.header.getHeaders().then((headers) => {
      this.http
        .post(environment.API_URL + url, data, {
          observe: "response",
        })
        .pipe(
          timeout(environment.TIMEOUT),
          catchError(this.error.handleError)
        )
        .subscribe((response: any) => {
          console.log('response:');

          console.log(response);
          // this.storage
          //   .set(
          //     "token",
          //     response.headers.get("Authorization").replace("Bearer ", "")
          //   )
          //   .then(() => {
          // this.token = data.headers
          //   .get("Authorization")
          //   .replace("Bearer ", "");

          // this.authState.next(true);
          resolve(response);
          // });
        }, reject);
    });
    // });
  }


  put_academic(url, data) {
    return new Promise((resolve, reject) => {
      this.header.getHeaders_academic().then((headers) => {
        this.http
          .put(environment.API_URL_ACADEMIC + url, data, headers)
          .pipe(
            timeout(environment.TIMEOUT),
            catchError(this.error.handleError)
          )
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.API_URL + "katalis/login", data, {
          observe: "response",
        })
        .pipe(timeout(environment.TIMEOUT), catchError(this.error.handleError))
        .subscribe((data) => {
          this.storage
            .set(
              "token",
              data.headers.get("Authorization").replace("Bearer ", "")
            )
            .then(() => {
              // this.token = data.headers
              //   .get("Authorization")
              //   .replace("Bearer ", "");

              // this.authState.next(true);
              console.log(data)
              resolve(data);
            });
        }, reject);
    });
  }

  login_academic(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.API_URL_ACADEMIC + "auth/login", data, {
          observe: "response",
        })
        .pipe(timeout(environment.TIMEOUT), catchError(this.error.handleError))
        .subscribe((data: any) => {
          this.storage
            .set(
              "token",
              data.body.access_token
            )
            .then(() => {
              this.storage
                .set(
                  "solution",
                  data.body.solutions
                ).then(() => { });

              resolve(data);
            });

        }, reject);
    });
  }
}
