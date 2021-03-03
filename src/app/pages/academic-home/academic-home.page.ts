import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { SheetStates } from 'ionic-custom-bottom-sheet';
import { Router, Event } from '@angular/router';
import { AcademicService } from 'src/app/services/academic.service';
import { AcademicHomeAddPage } from '../academic-home-add/academic-home-add.page';
import { GlobalObservableService } from 'src/app/services/global-observable.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { AcademicHomeAnswerPage } from '../academic-home-answer/academic-home-answer.page';
import * as moment from "moment";
import { AcademicHomeAddClassPage } from '../academic-home-add-class/academic-home-add-class.page';
import { AcademicHomeDetailClassPage } from '../academic-home-detail-class/academic-home-detail-class.page';
import { ScrollDetail } from '@ionic/core';
import { AlertService } from 'src/app/services/alert.service';
import { Shake } from '@ionic-native/shake/ngx';
import { environment } from 'src/environments/environment';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-academic-home',
  templateUrl: './academic-home.page.html',
  styleUrls: ['./academic-home.page.scss']
})
export class AcademicHomePage implements OnInit {

  @ViewChild('slideMenu', { static: false }) slideMenu: IonSlides;
  @ViewChild('slideStatus', { static: false }) slideStatus: IonSlides;
  @ViewChild('slideHeadline', { static: false }) slideHeadline: IonSlides;
  showClass = false;
  showTimeline = false;
  apiUrl = environment.API_URL_ACADEMIC;
  showHl = false;
  showDetailTimeline = false;
  showfilter = true;
  showToolbar = false;
  showToolbarAgain = false;
  showTop = false;
  showTopAgain = false;

  sliderGaleri = {
    zoom: false,
    sliderPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20,
    pager: true
  }

  sliderMenu = {
    initialSlide: 0,
    slidesPerView: 4.2,
    loop: false,
    centeredSlides: false,
    spaceBetween: 0
  };
  sliderStatus = {
    initialSlide: 0,
    slidesPerView: 3.5,
    loop: false,
    centeredSlides: false,
    spaceBetween: 0
  };

  sliderTop = {
    initialSlide: 0,
    slidesPerView: 3,
    loop: false,
    centeredSlides: false,
    spaceBetween: 0
  };

  sliderHeadline = {
    initialSlide: 0,
    slidesPerView: 1.2,
    loop: false,
    centeredSlides: false,
    spaceBetween: 1,
    pager: false
  }

  BottomSheetState: SheetStates;
  BottomSheetState2: SheetStates;

  bottomsheetShow = false;
  bottomSheetData: any;
  // detailClass: any;
  detailTimelines: any
  highlight: any;

  myShows = ['linear-gradient(135deg, #96de94, #82dd4c)', 'linear-gradient(135deg, #c483f4, #b265f1)', 'linear-gradient(135deg, #e08a8c, #e55f62)', 'linear-gradient(135deg, #5fc5fb, #5fa4fb)', 'linear-gradient(135deg, #f3d15a, #f6c238)', 'linear-gradient(135deg, #81e081, #73cd99)']
  start: number = 0;
  limit: number = 10;
  field: string = 'tags';
  key: string;
  timelines: any;
  classes = [];
  user: string;

  //timerd
  dateNow;
  timeInSeconds;
  time;
  runTimer;
  hasStarted;
  hasFinished;
  remainingTime;
  displayTime;

  duration = 60;
  watch;

  temp = 0;

  lastService = 'KATALIS';
  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    private academic: AcademicService,
    private globalObservable: GlobalObservableService,
    private loading: LoadingService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: AlertService,
    private photoViewer: PhotoViewer,
    private shake: Shake
  ) {
    this.storage.get('lastService').then((service: any) => {
      this.lastService = service;
      console.log(service);

    })
    this.dateNow = moment(moment().format('LLLL')).format("YYYY-MM-DD hh:mm");

    // this.initTimer();
    // this.startTimer();
    this.watch = this.shake.startWatch(60).subscribe(() => {
      this.academic.getTimeline(this.start, this.limit, this.field, this.key).then((timeline: any) => {
        for (var i = 0; i < timeline.content.length; i++) {
          var d = timeline.content[i].createTime.$date;
          let date = moment(d).format("DD MMM YYYY hh:mm a");
          timeline.content[i]['newDate'] = date;
          var fulname = timeline.content[i].accountName;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          timeline.content[i]['newDate'] = date;
          timeline.content[i]['first'] = a;
          timeline.content[i]['second'] = b;

          var attachments = timeline.content[i].attachments;
          var attachmentimage = [];
          var attachmentother = [];
          for (var ii = 0; ii < attachments.length; ii++) {
            if (attachments[ii].fileType == 'image') {
              attachmentimage.push(attachments[ii]);
            } else {
              attachmentother.push(attachments[ii]);
            }
          }
          timeline.content[i]['attachmentImage'] = attachmentimage;
          timeline.content[i]['attachmentOther'] = attachmentother;

        }
        this.showTimeline = true;
        this.timelines = timeline.content;
      })
    });



    this.globalObservable.getObservable().subscribe(data => {
      this.start = 0;
      if (data.label == "add:success") {
        this.academic.getHighlight().then((hl: any) => {
          this.highlight = hl;
          this.academic.getTimeline(this.start, this.limit, this.field, this.key).then((timeline: any) => {
            for (var i = 0; i < timeline.content.length; i++) {
              var d = timeline.content[i].createTime.$date;
              let date = moment(d).format("DD MMM YYYY hh:mm a");
              timeline.content[i]['newDate'] = date;
              var fulname = timeline.content[i].accountName;
              var a = fulname.split(' ')[0];
              var b = fulname.split(' ')[1];
              timeline.content[i]['newDate'] = date;
              timeline.content[i]['first'] = a;
              timeline.content[i]['second'] = b;

              var attachments = timeline.content[i].attachments;
              var attachmentimage = [];
              var attachmentother = [];
              for (var ii = 0; ii < attachments.length; ii++) {
                if (attachments[ii].fileType == 'image') {
                  attachmentimage.push(attachments[ii]);
                } else {
                  attachmentother.push(attachments[ii]);
                }
              }
              timeline.content[i]['attachmentImage'] = attachmentimage;
              timeline.content[i]['attachmentOther'] = attachmentother;
            }
            this.timelines = timeline.content;
            // this.loading.hide();
          })
        })
      }
      if (data.label == "addClass:success") {
        console.log('success');

        this.academic.getComboClass().then((res: any) => {
          this.classes = res;
          for (let i = 0; i < this.classes.length; i++) {
            this.classes[i]['icon'] = '../../../assets/icon white.png';
            this.classes[i]['bgcolor'] = this.getRandom();
          }
        });
        console.log(this.classes);

      }
      // this.loading.hide();
      this.showTimeline = true;
    });

    this.showClass = false;
    this.showTimeline = false;
    this.academic.getUser().then((user: any) => {
      console.log(user);

      // this.user = user.body.active_account.accounts[0];
      // console.log(user.body.active_account.accounts[0].student.length)
      if (this.isEmpty(user.body.active_account.accounts[0].student)) {
        this.user = "employee";
      } else {
        this.user = "student";
      }
      // console.log(this.user);
      this.storage.set('profile', user.body.active_account).then((users: any) => {
        // console.log(this.user);
        this.academic.getComboClass().then((res: any) => {
          this.showClass = true;
          this.classes = res;

          for (let i = 0; i < this.classes.length; i++) {
            this.classes[i]['icon'] = '../../../assets/icon white.png';
            this.classes[i]['bgcolor'] = this.getRandom();
          }
          this.academic.getHighlight().then((hl: any) => {
            this.showHl = true;
            this.highlight = hl;

            this.academic.getTimeline(this.start, this.limit, this.field, this.key).then((timeline: any) => {
              for (var i = 0; i < timeline.content.length; i++) {
                var d = timeline.content[i].createTime.$date;
                let date = moment(d).format("DD MMM YYYY hh:mm a");
                timeline.content[i]['newDate'] = date;

                var fulname = timeline.content[i].accountName;
                var a = fulname.split(' ')[0];
                var b = fulname.split(' ')[1];
                timeline.content[i]['newDate'] = date;
                timeline.content[i]['first'] = a;
                timeline.content[i]['second'] = b;

                var attachments = timeline.content[i].attachments;
                var attachmentimage = [];
                var attachmentother = [];
                for (var ii = 0; ii < attachments.length; ii++) {
                  if (attachments[ii].fileType == 'image') {
                    attachmentimage.push(attachments[ii]);
                  } else {
                    attachmentother.push(attachments[ii]);
                  }
                }
                timeline.content[i]['attachmentImage'] = attachmentimage;
                timeline.content[i]['attachmentOther'] = attachmentother;

              }
              this.showTimeline = true;

              this.timelines = timeline.content;

            })
          })
          // this.getHighlight();
        }).catch((error) => {
          this.toastCtrl.toastError('class hass not found')
        })
      })
    })
    // }, 500);
  }

  ngOnInit() {

  }

  doRefresh(event) {
    this.showClass = false;
    this.showTimeline = false;
    this.showHl = false;
    this.start = 0;
    // setTimeout(() => {
    this.academic.getUser().then((user: any) => {
      this.user = user.body.active_account.accounts[0];
      // console.log(user.body.active_account.accounts[0].student.length)
      if (this.isEmpty(user.body.active_account.accounts[0].student)) {
        this.user = "employee";
      } else {
        this.user = "student";
      }
      // console.log(this.user);
      this.storage.set('profile', user.body.active_account).then((users: any) => {
        // console.log(this.user);
        this.academic.getComboClass().then((res: any) => {
          this.showClass = true;
          this.classes = res;
          for (let i = 0; i < this.classes.length; i++) {
            this.classes[i]['icon'] = '../../../assets/icon white.png';
            this.classes[i]['bgcolor'] = this.getRandom();
          }
          this.academic.getHighlight().then((hl: any) => {
            this.showHl = true;
            this.highlight = hl;
            this.academic.getTimeline(this.start, this.limit, this.field, this.key).then((timeline: any) => {
              for (var i = 0; i < timeline.content.length; i++) {
                var d = timeline.content[i].createTime.$date;
                let date = moment(d).format("DD MMM YYYY hh:mm a");
                timeline.content[i]['newDate'] = date;
                var fulname = timeline.content[i].accountName;
                var a = fulname.split(' ')[0];
                var b = fulname.split(' ')[1];
                timeline.content[i]['newDate'] = date;
                timeline.content[i]['first'] = a;
                timeline.content[i]['second'] = b;


                var attachments = timeline.content[i].attachments;
                var attachmentimage = [];
                var attachmentother = [];
                for (var ii = 0; ii < attachments.length; ii++) {
                  if (attachments[ii].fileType == 'image') {
                    attachmentimage.push(attachments[ii]);
                  } else {
                    attachmentother.push(attachments[ii]);
                  }
                }
                timeline.content[i]['attachmentImage'] = attachmentimage;
                timeline.content[i]['attachmentOther'] = attachmentother;

              }
              this.showTimeline = true;
              this.timelines = timeline.content;
            })
          })
          // this.getHighlight();
        })
      })
    })

    event.target.complete();
  }

  ionViewWillLeave() {
    this.watch.unsubscribe();
  }

  // public OpenSheet(res) {
  //   this.start = 0;
  //   this.bottomsheetShow = true;
  //   this.bottomSheetData = res;
  //   this.academic.getClassById(res.id).then((response: any) => {
  //     this.detailClass = response;
  //     this.academic.getTimeline(this.start, this.limit, this.field, this.key).then((timeline: any) => {
  //       this.showTimeline = true;
  //       for (var i = 0; i < timeline.content.length; i++) {
  //         var d = timeline.content[i].createTime.$date;
  //         let date = moment(d).format("DD MMM YYYY hh:mm a");
  //         timeline.content[i]['newDate'] = date;

  //       }
  //       this.detailTimelines = timeline.content;

  //     })

  //   })
  //   this.BottomSheetState = SheetStates.Opened;
  // }

  // public OpenSheet2() {
  //   this.BottomSheetState2 = SheetStates.Opened;
  // }

  public StateChanged(event) {
    if (event == SheetStates.Closed) {
      // console.log("Sheet Closed");
    }
  }



  openCommentPage(data) {
    let navigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      },
    };
    this.router.navigate(['academic-home-comment'], navigationExtras);

  }

  openDetail(data) {
    if (data.tipe == 'ujian') {
      let navigationExtras = {
        queryParams: {
          data: JSON.stringify(data)
        },
      };
      this.router.navigate(['exam-data'], navigationExtras);
    } else if (data.tipe == 'tugas') {

    } else {
      let navigationExtras = {
        queryParams: {
          data: JSON.stringify(data)
        },
      };
      this.router.navigate(['practise-data'], navigationExtras);
    }

  }


  getRandom() {
    let show = this.myShows[Math.floor(Math.random() * this.myShows.length)];
    return show;
  }


  async openAdd(title) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAddPage,
      componentProps: {
        title: title,
      },
    });
    return await modal.present();
  }

  async detailClass(item) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeDetailClassPage,
      componentProps: {
        item: item,
      },
    });
    return await modal.present();
  }


  async addClass() {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAddClassPage,
      componentProps: {
      },
    });
    return await modal.present();
  }

  async openAnswer(item) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAnswerPage,
      componentProps: {
        item: item
      },
    });
    return await modal.present();
  }

  async loadData(event) {
    console.log(this.start);

    this.start += 1;

    this.academic
      .getTimeline(this.start, this.limit, this.field, this.key)
      .then((timeline: any = []) => {
        for (let ii = 0; ii < timeline.content.length; ii++) {

          var d = timeline.content[ii].createTime.$date;
          let date = moment(d).format("DD MMM YYYY hh:mm a");
          timeline.content[ii]['newDate'] = date;
          timeline.content[ii]['avatarBg'] = this.getRandom();
          this.timelines.push(timeline[ii]);
          var fulname = timeline.content[ii].accountName;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          timeline.content[ii]['newDate'] = date;
          timeline.content[ii]['first'] = a;
          timeline.content[ii]['second'] = b;

          var attachments = timeline.content[ii].attachments;
          var attachmentimage = [];
          var attachmentother = [];
          for (var jj = 0; jj < attachments.length; jj++) {
            if (attachments[jj].fileType == 'image') {
              attachmentimage.push(attachments[jj]);
            } else {
              attachmentother.push(attachments[jj]);
            }
          }
          timeline.content[ii]['attachmentImage'] = attachmentimage;
          timeline.content[ii]['attachmentOther'] = attachmentother;
        }
        event.target.complete();
      })
      .catch((error) => {

        event.target.complete();
      });
    event.target.complete();
  }

  async filter(filter, key) {
    this.start = 0;
    this.showfilter = false;
    this.field = filter;
    this.key = key;
    this.academic
      .getTimeline(this.start, this.limit, this.field, this.key)
      .then((timeline: any = []) => {
        for (var i = 0; i < timeline.content.length; i++) {
          var d = timeline.content[i].createTime.$date;
          let date = moment(d).format("DD MMM YYYY hh:mm a");
          timeline.content[i]['newDate'] = date;
          var fulname = timeline.content[i].accountName;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          timeline.content[i]['newDate'] = date;
          timeline.content[i]['first'] = a;
          timeline.content[i]['second'] = b;
        }
        this.showfilter = true;
        this.timelines = timeline.content;
      })
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  async presentLogout() {
    const confirm = await this.alertCtrl.create({
      header: "Konfirmasi",
      message: "Apakah Anda yakin ingin logout?",
      buttons: [
        {
          text: "Batal",
          handler: () => { }
        },
        {
          text: "Logout",
          handler: () => {
            this.confirmLogout();
          }
        }
      ]
    });

    confirm.present();
  }

  confirmLogout() {
    // console.log('lgotu')
    this.storage.remove("profile");
    this.storage.remove("token");
    this.router.navigate(["/login"]);
  }

  onScroll($event: CustomEvent<ScrollDetail>) {

    if ($event && $event.detail && $event.detail.scrollTop) {

      const scrollTop = $event.detail.scrollTop;
      if (this.temp == 0) {
        this.temp = scrollTop;
      }
      this.showToolbar = scrollTop >= 38;
      this.showToolbarAgain = this.temp > scrollTop;

      this.showTop = scrollTop >= 0;
      this.showTopAgain = this.temp > scrollTop;
      this.temp = scrollTop;
    } else {
      // console.log('down');
    }
  }


  initTimer() {
    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      this.timeInSeconds = this.duration * 60;
    }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) {
        return;
      }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      } else {
        this.hasFinished = true;
        // console.log('waktu habis');
        this.toastCtrl.alert('waktu habis');
        // this.sendAnswerForce();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = hours < 10 ? '0' + hours : hours.toString();
    minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  async getHighlight() {
    this.academic.getHighlight().then((hl: any) => {
      console.log(hl)
    })
  }

  between(datenow, date1, date2) {
    if (datenow >= date1 && datenow <= date2) {
      // console.log('benar');
      return true;
    } else {
      // console.log('salah');
      return false;

    }
  }

  turnBack() {
    console.log('tes');
    this.router.navigate(['/app/tabs/home']);
    this.globalObservable.publish({
      label: "sso:change"
    });
    console.log('sso');

  }
  openPreview(img) {

  }
}
