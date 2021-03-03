import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpService) { }


  getAll(accountId, callerId, month, year) {

    return this.http.get_py("main_a/pengguna/pengguna_get_data_akses/" + accountId + "/" + callerId + "/" + month.replace(/\b0+/g, '') + "/" + year);
  }
  scanQr(qrcode) {
    var data = {
      "qris": qrcode
    }
    return this.http.post('katalis/access/qris', data);
  }
}
