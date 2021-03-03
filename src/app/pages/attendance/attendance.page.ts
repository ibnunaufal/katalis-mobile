import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ScrollDetail } from '@ionic/core';
import { SheetStates } from 'ionic-custom-bottom-sheet';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  data: any = [];
  showToolbar = false;
  showToolbarAgain = false;
  showTop = false;
  showTopAgain = false
  temp = 0;


  currentStudent;
  SelectedStudent: any;

  accountId;
  callerId;
  students;
  month;
  year;


  input: any = [];

  currentDate;
  cValue;

  currentValue;


  public BottomSheetState: SheetStates = SheetStates.Closed;
  constructor(
    private loading: LoadingService,
    private attendanceService: AttendanceService,
    private storage: Storage,
    private alert: AlertService,
    private router: Router
  ) {
    // this.loading.show()

    this.currentDate = new Date();

    this.month = formatDate(this.currentDate, 'MM', 'en-US');
    this.year = formatDate(this.currentDate, 'yyyy', 'en-US');

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

        this.attendanceService.getAll(this.accountId, this.callerId, this.month, this.year).then((attendance: any) => {
          // this.loading.hide()
          this.data = attendance

          this.getCurrentDate(this.accountId, this.callerId);
        }, error => {
          // this.loading.hide()
        })
      })
    })

  }

  ngOnInit() {

  }
  getCurrentDate(companyId, callerId) {
    this.attendanceService.getCurrentDate(companyId, callerId).then((current: any) => {
      this.currentValue = current[0]
      console.log(current);

    })
  }

  onScroll($event: CustomEvent<ScrollDetail>) {

    if ($event && $event.detail && $event.detail.scrollTop) {

      const scrollTop = $event.detail.scrollTop;
      if (this.temp == 0) {
        this.temp = scrollTop;
      }
      this.showToolbar = scrollTop >= 0;
      this.showToolbarAgain = this.temp > scrollTop;
      setTimeout(() => {
        this.showToolbarAgain = true;
      }, 1000);
      this.temp = scrollTop;
      console.log(this.temp);

    } else {
      // console.log('down');
    }
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
    // this.loading.show
    this.storage.get('profile').then(profile => {

      this.attendanceService.getCallerId().then((callerId: any) => {
        this.accountId = profile.accounts[0].id
        this.students = callerId


        var student: any;
        student = this.SelectedStudent.split(".");
        if (callerId[0].callerId == "") {
          this.callerId = "none"
          this.currentStudent = profile.name
        } else {
          this.callerId = student[0] != '' ? student[0] : 'none'
          this.currentStudent = student[1]
        }


        this.attendanceService.getAll(this.accountId, this.callerId, m, y).then((attendance: any) => {
          // this.loading.hide
          this.data = attendance
          // this.getCurrentDate(this.accountId, this.callerId);
          console.log(this.data);

        }, error => {
          // this.loading.hide
        })
      })

    })
    SheetStates.Docked

  }
}
