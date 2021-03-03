import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import { SheetStates } from 'ionic-custom-bottom-sheet';
import * as moment from 'moment';
import { AttendanceService } from '../../services/attendance.service';
@Component({
  selector: 'app-smart-access',
  templateUrl: './smart-access.page.html',
  styleUrls: ['./smart-access.page.scss'],
})
export class SmartAccessPage implements OnInit {
  data: any;
  input: any = [];
  accountId;
  callerId;
  students;

  month;
  year;
  currentDate;
  date;

  currentStudent;
  SelectedStudent;

  scannedCode;
  public BottomSheetState: SheetStates = SheetStates.Closed;
  constructor(private loading: LoadingService,
    private accessService: AccessService,
    private attendanceService: AttendanceService,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private alert: AlertService,
    private storage: Storage) {
    // this.loading.show()

    this.date = new Date();
    this.currentDate = formatDate(this.date, 'dd MMMM yyyy', 'en-US');
    this.month = formatDate(this.date, 'MM', 'en-US');
    this.year = formatDate(this.date, 'yyyy', 'en-US');


    this.storage.get('profile').then(profile => {
      this.attendanceService.getCallerId().then((callerId: any) => {
        this.accountId = profile.accounts[0].id
        this.students = callerId;

        if (callerId[0].callerId == "") {
          this.callerId = "none"
          this.currentStudent = profile.name
        } else {
          this.callerId = callerId[0].callerId
          this.currentStudent = callerId[0].name;
        }
        this.accessService.getAll(this.accountId, this.callerId, this.month, this.year).then((access: any) => {
          // this.loading.hide()
          this.data = access
          console.log(access);


        }, error => {
          // this.loading.hide()
        })


      })
    })
  }

  ngOnInit() {
  }

  openScan() {
    this.router.navigateByUrl("/scanqr")
  }

  scanCode() {
    this.loading.show()
    this.barcodeScanner.scan().then(barcodeData => {
      this.loading.hide()
      this.scannedCode = barcodeData.text;
      console.log(this.scannedCode);
      this.accessService.scanQr(this.scannedCode).then((res: any) => {
        console.log(res);
        this.alert.toastSuccess('Wait a minute, the door will open.')
      }, error => {
        this.alert.toastError('Server is busy, please try again later.')

      })
    }, error => {
      this.loading.hide()

    })
  }

  public OpenSheet() {
    this.BottomSheetState = SheetStates.Opened;
  }

  public StateChanged(event) {
    console.log(event);

    if (event == SheetStates.Closed) {
      console.log("Sheet Closed");
    }
  }

  filter() {

    let m = moment(this.input.month).format("MM");
    let y = moment(this.input.year).format("YYYY");
    this.loading.show
    this.storage.get('profile').then(profile => {

      this.attendanceService.getCallerId().then((callerId: any) => {
        this.accountId = profile.accounts[0].id
        this.students = callerId;



        var student: any;
        student = this.SelectedStudent.split(".");
        if (callerId[0].callerId == "") {
          this.callerId = "none"
          this.currentStudent = profile.name
        } else {
          this.callerId = student[0] != '' ? student[0] : 'none'
          this.currentStudent = student[1]
        }

        this.accessService.getAll(this.accountId, this.callerId, m, y).then((access: any) => {
          this.data = access
          console.log(access);

        }, error => {
          this.loading.hide
        })

      })
    })
    SheetStates.Docked

  }

}

