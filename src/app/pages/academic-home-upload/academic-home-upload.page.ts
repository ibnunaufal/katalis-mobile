import { Component, OnInit, NgZone } from '@angular/core';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { environment } from 'src/environments/environment';
import { AcademicService } from 'src/app/services/academic.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalObservableService } from 'src/app/services/global-observable.service';
@Component({
  selector: 'app-academic-home-upload',
  templateUrl: './academic-home-upload.page.html',
  styleUrls: ['./academic-home-upload.page.scss'],
})
export class AcademicHomeUploadPage implements OnInit {
  FileURI: any;
  FileName: any;

  apiUrl = environment.API_URL_ACADEMIC;
  start: number = 0;
  limit: number = 10;
  data: any;
  input: any = [];

  tempFile: any = [];
  constructor(
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
    private transfer: FileTransfer,
    private loading: LoadingController,
    private globalObservable: GlobalObservableService,
    private zone: NgZone,
    private alert: AlertService,
    private academic: AcademicService,
    private modalCtrl: ModalController,
    private storage: Storage) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.academic.getMedia(this.start, this.limit).then((res: any) => {
      this.data = res.content;
      for (let i = 0; i < res.content.length; i++) {
        this.data[i].checked = false;
      }
      console.log(this.data);
    })
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
    this.globalObservable.publish({
      label: "file:got",
      value: this.tempFile,
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
      let URL = this.apiUrl + "media";

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
        .then((data) => {
          console.log(data);
          this.loading.dismiss();
          this.getData();
          this.FileName = "";
          this.presentToast("File uploaded successfully");
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

  async loadData(event) {
    this.start += 1;

    this.academic
      .getMedia(this.start, this.limit)
      .then((timeline: any = []) => {
        for (let ii = 0; ii < timeline.content.length; ii++) {
          this.data.push(timeline.content[ii]);
        }
        event.target.complete();
      })
      .catch((error) => {

        event.target.complete();
      });
    event.target.complete();
  }

  filename(item, $event) {
    if (item.checked == false) {
      this.tempFile.push(item.fileUrl);

    } else {
      let newArray = this.tempFile.filter(function (el) {
        return el !== item;
      });
      this.tempFile.fileUrl = newArray.fileUrl;
    }
    console.log(this.tempFile);
  }

  addCheckbox(event, checkbox: String, ext: string) {
    if (event.target.checked) {
      this.tempFile.push({ 'fileUrl': checkbox, 'fileType': ext });
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.tempFile.splice(index, 1);
    }
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.tempFile.findIndex((category) => {
      return category.fileUrl === checkbox;
    })
  }

  //Empties array with checkedboxes
  emptyCheckedArray() {
    this.tempFile = [];
  }

  getCheckedBoxes() {
    //Do whatever
    console.log(this.tempFile);
  }

}
