import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AcademicService } from 'src/app/services/academic.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { GlobalObservableService } from 'src/app/services/global-observable.service';
import { AcademicHomeUploadPage } from '../academic-home-upload/academic-home-upload.page';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { AcademicHomeAddQuestionPage } from '../academic-home-add-question/academic-home-add-question.page';
import { AcademicHomeEditQuestionPage } from '../academic-home-edit-question/academic-home-edit-question.page';
import { TopupHistoryPageRoutingModule } from '../topup-history/topup-history-routing.module';
import * as moment from "moment";

@Component({
  selector: 'app-academic-home-add',
  templateUrl: './academic-home-add.page.html',
  styleUrls: ['./academic-home-add.page.scss'],
})
export class AcademicHomeAddPage implements OnInit {
  headerName;
  date;
  description;
  file;

  input: any = [];

  kelas: any;
  sesi: any;

  tempFile: any;
  tempQuestion: any;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private academic: AcademicService,
    private router: Router,
    private alertService: AlertService,
    private globalObservable: GlobalObservableService,
  ) {
    this.headerName = this.navParams.get("title");
    this.getComboJadwal();
    this.globalObservable.getObservable().subscribe(data => {
      // this.loading.show();
      // console.log(data);
      if (data.label == "file:got") {
        this.tempFile = data.value;
        console.log(this.tempFile)
      }
      if (data.label == "question:got") {
        if (this.tempQuestion == null) {
          this.tempQuestion = [data.value];
        } else {
          this.tempQuestion.push(data.value)
        }
        // console.log(this.tempQuestion);
      }
      if (data.label == "question:edit") {
        let index = this.removeDataFromArray(data.value);
        this.tempQuestion.splice(index, 1);
        if (this.tempQuestion == null) {
          this.tempQuestion = [data.value];
        }
        else {
          this.tempQuestion.push(data.value)
        }

      }
    })
  }

  ngOnInit() {

  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  addInfo() {
    this.academic.addInfo(this.input.title, this.input.description, ['info'], [], true).then((info: any) => {
      this.globalObservable.publish({
        label: "add:success"
      });
    })

    this.dismiss();
    this.alertService.toastSuccess("Success");

  }


  addMateri() {
    var data: any =
    {
      "rppId": this.input.jadwal,
      "rencanaKbmId": this.input.sesi,
      "judul": this.input.title,
      "keterangan": this.input.description,
      "materi": this.input.materi,
      "attachments": this.tempFile,
      "link": [
        this.input.link ? this.input.link : '-'
      ],
      "status": this.input.share
    }
    this.academic.addMateri(data).then((materi: any) => {
      this.globalObservable.publish({
        label: "add:success"
      });
      this.dismiss();
      this.alertService.toastSuccess('Tambah materi berhasil')
    })
  }

  addTugas() {
    var data: any = {
      "rppId": this.input.jadwal,
      "rencanaKbmId": this.input.sesi,
      "judul": this.input.title,
      "keterangan": this.input.description,
      "attachments": this.tempFile,
      "status": this.input.share
    }
    this.academic.addTugas(data).then((materi: any) => {
      this.globalObservable.publish({
        label: "add:success"
      });
      this.dismiss();
      this.alertService.toastSuccess('Tambah tugas berhasil')
    })
  }

  addUjian() {
    var temp = [];
    // console.log(this.tempQuestion.length);
    for (var i = 0; i < this.tempQuestion.length; i++) {
      var json =
      {
        "bankSoal": {
          "tipe": 'multiple choice',
          "question": this.tempQuestion[i].description,
          "answers": [
            {
              "option": "A",
              "answer": this.tempQuestion[i].opsi[0].a,
            },
            {
              "option": "B",
              "answer": this.tempQuestion[i].opsi[0].b,
            },
            {
              "option": "C",
              "answer": this.tempQuestion[i].opsi[0].c,
            },
            {
              "option": "D",
              "answer": this.tempQuestion[i].opsi[0].d,
            },
            {
              "option": "E",
              "answer": this.tempQuestion[i].opsi[0].e,
            }
          ],
          "answerKey": this.tempQuestion[i].jawaban.value,
          "status": true
        },
        "nilai": 0,
        "waktu": 0,
      }
      temp.push(json);
    }
    // console.log(temp);
    let date = moment(this.input.tanggalPelaksanaan).format("YYYY-MM-DD");
    let time1 = moment(this.input.awal).format("HH:mm");
    let time2 = moment(this.input.akhir).format("HH:mm");
    var data = {
      "title": this.input.title,
      "tipe": this.input.type,
      "rppId": this.input.jadwal,
      "soal": temp,
      "durasi": this.input.duration,
      "tanggalPelaksanaan": date,
      "waktuMulai": time1,
      "waktuSelesai": time2,
      "finish": this.input.finish,
      "status": this.input.share,
      "keterangan": this.input.note
    }

    this.academic.addUjian(data).then((res: any) => {
      this.globalObservable.publish({
        label: "add:success"
      });
      this.dismiss();
      this.alertService.toastSuccess('Tambah Ujian berhasil')
    })
  }

  addLatihan() {
    var temp = [];
    // console.log(this.tempQuestion.length);
    for (var i = 0; i < this.tempQuestion.length; i++) {
      var json =
      {
        "bankSoal": {
          "tipe": 'multiple choice',
          "question": this.tempQuestion[i].description,
          "answers": [
            {
              "option": "A",
              "answer": this.tempQuestion[i].opsi[0].a,
            },
            {
              "option": "B",
              "answer": this.tempQuestion[i].opsi[0].b,
            },
            {
              "option": "C",
              "answer": this.tempQuestion[i].opsi[0].c,
            },
            {
              "option": "D",
              "answer": this.tempQuestion[i].opsi[0].d,
            },
            {
              "option": "E",
              "answer": this.tempQuestion[i].opsi[0].e,
            }
          ],
          "answerKey": this.tempQuestion[i].jawaban.value,
          "status": true
        },
        "nilai": 0,
        "waktu": 0,
      }
      temp.push(json);
    }
    // console.log(temp);
    let date = moment(this.input.tanggalPelaksanaan).format("YYYY-MM-DD");
    let time1 = moment(this.input.awal).format("HH:mm");
    let time2 = moment(this.input.akhir).format("HH:mm");
    var data = {
      "title": this.input.title,
      "tipe": this.input.type,
      "rppId": this.input.jadwal,
      "soal": temp,
      "durasi": this.input.duration,
      "tanggalPelaksanaan": date,
      "waktuMulai": time1,
      "waktuSelesai": time2,
      "finish": this.input.finish,
      "status": this.input.share,
      "keterangan": this.input.note
    }

    this.academic.addLatihan(data).then((res: any) => {
      this.globalObservable.publish({
        label: "add:success"
      });
      this.dismiss();
      this.alertService.toastSuccess('Tambah Latihan berhasil')
    })
  }
  async openUpload() {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeUploadPage,
    });
    return await modal.present();
  }


  async openQuestion() {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAddQuestionPage,
    });
    return await modal.present();
  }

  getComboJadwal() {
    this.academic.getComboJadwal().then((res: any) => {
      this.kelas = res.data;
    })
  }

  getComboSesi($event) {
    var id = $event.detail.value
    this.academic.getComboSesi(id).then((res: any) => {
      this.sesi = res.data;
    })
  }

  async openEditQuestion(item) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeEditQuestionPage,
      componentProps: {
        item: item,
      },
    });
    return await modal.present();
  }

  async deleteQuestion(item) {
    let index = this.removeDataFromArray(item);
    this.tempQuestion.splice(index, 1);

  }

  removeDataFromArray(data: any) {
    return this.tempQuestion.findIndex((res) => {
      return res === data;
    })
  }

}

