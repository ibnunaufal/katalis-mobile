import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpService) { }


  getAll(accountId, callerId, month, year) {

    return this.http.get_py("main_a/pengguna/pengguna_get_data_absen/" + accountId + "/" + callerId + "/" + month.replace(/\b0+/g, '') + "/" + year);
  }
  getCurrentDate(accountId, callerId) {

    return this.http.get_py("main_a/pengguna/pengguna_get_today_data_absen/" + accountId + "/" + callerId);
  }
  getCallerId() {

    return this.http.get_py("main_a/pengguna/get_caller_id/");
  }
}
