import {Injectable} from "@angular/core";
import { HttpService } from "./http.service";

const API_GET_ALL_DONATION_URL = "katalis/donation/all";
const API_ADD_DONATION_URL ='katalis/transaction/donation/payment';

@Injectable({
    providedIn: "root",
})
export class DonationService {
    
    constructor(private http: HttpService) { }

GET_ALL_DONATION(){
    return this.http.get(API_GET_ALL_DONATION_URL);
}

ADD_DONATION(accountId,id,amount,callerId){
  var data = {
    accountId:accountId,
    callerId:'',
    amount: amount,
    cash: true,
    channel: "MOBILE",
    donationId: id,
   
  };
  return this.http.post(API_ADD_DONATION_URL,data);
}

getHistory(id){
  return this.http.get("katalis/donation/"+id);
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