import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";

const API_TOPUP_MERCHANT = 'katalis/idn/gateway/topup';

@Injectable({
  providedIn: 'root'
})
export class TopupMerchantService {

  constructor(private http : HttpService) { }

TOTUP_MERCHANT_SERVICES(amount){
var data = {
  // id:id,
  // company:company,
  // accountNumber:accountNumber,
  amount: amount
};
return this.http.post(API_TOPUP_MERCHANT,data);
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
