import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, AlertController, LoadingController, IonSlides } from '@ionic/angular';
import { ReplacePipe } from 'src/app/pipes/replace.pipe';
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { AcademicService } from 'src/app/services/academic.service';
import { File } from '@ionic-native/file/ngx';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from "moment";
import { Vibration } from '@ionic-native/vibration/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { isNumber } from 'util';
@Component({
  selector: 'app-exam-data',
  templateUrl: './exam-data.page.html',
  styleUrls: ['./exam-data.page.scss'],
})
export class ExamDataPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  data: any;
  id: string;
  exam: any;
  examLenght;
  que = 0;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.2,
    loop: false,
    centeredSlides: true,
    spaceBetween: 10,
  };

  sliderHeadline = {
    initialSlide: 0,
    slidesPerView: 1.2,
    loop: false,
    centeredSlides: false,
    spaceBetween: 1,
    pager: false
  }

  showBackdrop = true;

  dateNow;
  timeNow;

  timeInSeconds;
  time;
  runTimer;
  hasStarted;
  hasFinished;
  remainingTime;
  displayTime = '00:00:00';

  duration: 0;
  watch;
  answerResult = [];
  finalResult = [];

  progressValue = 0;
  progress = 0;
  blink = false;
  selectedShippingMethod: string = '';
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastCtrl: AlertService,
    private router: Router,
    private loading: LoadingController,
    private vibration: Vibration,
    private insomnia: Insomnia
  ) {
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );

    let dateNow = moment(moment().format('LLLL')).format("YYYY-MM-DD hh:mm");
    console.log(dateNow);
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.data = JSON.parse(params.data);
        // console.log(this.data)
        // this.loading
        //   .create({
        //     message: "Please Wait.."
        //   })
        //   .then(res => {
        //     res.present();
        //   });

        this.academicService.getExam(this.data.detailId).then((res: any) => {
          console.log(res);

          if (res.detail) {
            this.toastCtrl.alert(res.detail);
          }
          this.loading.dismiss();
          this.exam = res.soal;
          this.examLenght = this.exam.length;
          // sett ion progress bar
          this.progress = 1 / this.examLenght;
          this.progressValue = this.progress;

          this.dateNow = moment(moment().format('LLLL')).format("YYYY-MM-DD");
          console.log(dateNow)
          this.timeNow = moment(moment().format('LLLL')).format("hh:mm");
          if (this.dateNow == res.tanggalPelaksanaan && (this.timeNow >= res.waktuMulai && this.timeNow <= res.waktuSelesai)) {
            setTimeout(() => {
              this.showBackdrop = false;
              this.pemberitahuan(res.durasi);
            }, 500);

          } else {
            this.waktuHabis();
          }

        })

      }

    });
    // this.initTimer();
    // this.startTimer();
  }

  ngOnInit() {
  }

  async pemberitahuan(durasi) {
    // this.loading.dismiss();

    const alert = await this.alertCtrl.create({
      header: "Pemberitahuan !!",
      message: "Ujian akan dimulai setelah tombol 'Mulai' ditekan. \r\n" +
        "Setelah tombol 'Mulai' ditekan waktu akan berjalan dan" +
        "\r\nselama waktu berjalan ujian tidak bisa diulang atau dibatalkan. \r\nsemoga berhasil",

      buttons: [
        {
          text: "Batal",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.router.navigate(["/academic-home"])
          },
        },
        {
          text: "Mulai",
          handler: () => {
            this.duration = durasi;
            this.initTimer();
            this.startTimer();
          },
        },
      ],
    });

    await alert.present();


  }
  async waktuHabis() {
    // this.loading.dismiss();

    const alert = await this.alertCtrl.create({
      header: "Pemberitahuan !!",
      message: "Waktu ujian telah habis, terimakasih telah mengikuti ujian ini.",
      buttons: [
        {
          text: "Keluar",
          handler: () => {
            this.insomnia.allowSleepAgain()
              .then(
                () =>
                  this.router.navigate(["/academic-home"]),
                () => console.log('error')
              );

          },
        },
      ],
    });

    await alert.present();


  }
  async waktuHabisTest() {
    // this.loading.dismiss();

    const alert = await this.alertCtrl.create({
      header: "Pemberitahuan !!",
      message: "Waktu ujian telah habis, terimakasih telah mengikuti ujian ini. \n jawaban otomatis dikirim ke sistem.",
      buttons: [
        {
          text: "Keluar",
          handler: () => {
            this.insomnia.allowSleepAgain()
              .then(
                () =>
                  this.router.navigate(["/academic-home"]),
                () => console.log('error')
              );

          },
        },
      ],
    });

    await alert.present();


  }

  slideChange(event) {
    this.slides.getActiveIndex().then(index => {
      //1  5
      this.progress = 1 / this.examLenght;
      if (this.que > index) {
        this.progressValue -= this.progress;
      } else if (this.que < index) {
        this.progressValue += this.progress;
      }
      // console.log(this.progressValue);
      this.que = index;
    });
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
        if (this.displayTime == '00:05:00' || this.displayTime == '00:04:00' || this.displayTime == '00:03:00' || this.displayTime == '00:02:00' || this.displayTime == '00:01:00') {
          this.vibration.vibrate([200, 50, 200]);
          this.blink = true;
        }
        else if (this.displayTime == '00:00:01') {
          this.vibration.vibrate([1000, 50, 500]);
          this.blink = true;
        }
        else if (this.displayTime < '00:05:00') {
          this.blink = true;
        }
      } else {
        this.hasFinished = true;
        this.waktuHabisTest();
        // this.sendAnswerForce();
      }
      // console.log(this.displayTime);
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

  async selectSlide(i) {
    const slide = await this.alertCtrl.create({
      header: "Silahkan masukkan nomor soal.",
      inputs: [
        {
          name: 'numberq',
          placeholder: 'Masukkan nomor soal'
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Pilih',
          handler: data => {
            console.log(data);

            if (data.numberq != '' && data.numberq <= this.examLenght) {
              console.log(Number(data.numberq) - 1);
              this.slides.slideTo(Number(data.numberq) - 1);
            } else {
              return false;
            }
          }
        }
      ],
    });

    await slide.present();
  }

  SendResult() {
    console.log(this.answerResult.length);
    for (let ii = 0; ii < this.answerResult.length; ii++) {
      this.finalResult.push({
        "bankSoalId": this.exam[ii].bankSoal.id,
        "jawaban": this.answerResult[ii],
        "lamaJawab": 0,
        "hasilJawaban": true,
        "nilai": 0
      });
    }
    console.log(this.finalResult);
    this.waktuHabisTest();
    this.academicService.postUjian(this.finalResult, this.data.detailId).then((res: any) => {

    })
  }
}                                   
