import { Component, OnInit, NgZone, ViewChild, ElementRef, Directive, HostListener } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { environment } from 'src/environments/environment';
import { AcademicService } from 'src/app/services/academic.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController, ModalController, NavParams, AngularDelegate } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-academic-home-answer',
  templateUrl: './academic-home-answer.page.html',
  styleUrls: ['./academic-home-answer.page.scss'],
})
export class AcademicHomeAnswerPage implements OnInit {
  input: any = [];
  answer: any;
  FileURI: any;
  FileName: any;

  apiUrl = environment.API_URL_ACADEMIC;
  res: any;
  data: any;

  user: string;
  constructor(private modalCtrl: ModalController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
    private transfer: FileTransfer,
    private loading: LoadingController,
    private zone: NgZone,
    private alert: AlertService,
    private academic: AcademicService,
    private storage: Storage,
    private navParams: NavParams,
    private element: ElementRef) {
    this.res = this.navParams.get("item");

    this.getData();
  }
  getData() {
    this.storage.get('profile').then((profile: any) => {
      console.log(profile)
      if (this.isEmpty(profile.accounts[0].student)) {
        this.user = "employee";
      } else {
        this.user = "student";
      }
      console.log(this.user);

    })
    this.academic.getTugasByTimelineId(this.res.kbmId, this.res.detailId).then((res: any) => {
      this.answer = res;
      console.log(this.answer);

    })
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ChooseFile() {
    //get file with cordova file chooser
    this.fileChooser.open()
      .then(uri => {
        //file uri for upload
        this.FileURI = uri;
        this.filePath.resolveNativePath(uri) //get file path
          .then(filePath => {
            this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo => //get info file
            {
              let files = fileInfo as FileEntry;
              files.file(success => {
                this.zone.run(() => { //updating binding file name
                  this.FileName = success.name; //get file name 
                });
              });
            }, err => {
              console.log(err);
              throw err;
            });
          });
      }).catch(e => console.log(e));
  }

  UploadFile() {
    this.storage.get('token').then((token: string) => {
      //show loading spinner
      this.loading
        .create({
          message: "Uploading.."
        })
        .then(res => {
          res.present();
        });

      const fileTransfer: FileTransferObject = this.transfer.create();
      //Local PC Web service if using an emulator 
      let URL = this.apiUrl + "media/other";

      //Local PC Web service if using the real device and in one network
      //let URL="http://192.168.99.187/upload-file-ionic/upload.php";

      //option upload
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.FileName,
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        params: { fileName: this.FileName }, // add another parameter (opsional)
        headers: { "Authorization": 'Bearer ' + token }
      }
      fileTransfer.upload(this.FileURI, URL, options)
        .then((data: any) => {
          this.loading.dismiss();
          this.presentToast("File uploaded successfully");
          this.academic.AddAnswerByTimelineId(this.res.kbmId, this.res.detailId, this.FileName, this.input.answer).then((answer: any) => {
            this.presentToast("Success");
            this.getData();
            this.input.answer = "";
            this.FileName = "";

          }, (err) => {
            this.alert.alert("Error :" + JSON.stringify(err));
          })
        }, (err) => {
          console.log(err);
          this.loading.dismiss();
          this.alert.alert("Error :" + JSON.stringify(err));
        });
    })
  }

  presentToast(msg) {
    this.alert.toast(msg);
  }



}
