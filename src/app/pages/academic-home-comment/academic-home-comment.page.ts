import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ReplacePipe } from 'src/app/pipes/replace.pipe';
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { AcademicService } from 'src/app/services/academic.service';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';
import { AlertService } from 'src/app/services/alert.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-academic-home-comment',
  templateUrl: './academic-home-comment.page.html',
  styleUrls: ['./academic-home-comment.page.scss'],
  providers: [ReplacePipe],
})
export class AcademicHomeCommentPage implements OnInit {
  data: any;
  comments: any;
  input: any = [];
  color = '#cbcbcb';

  apiUrl = environment.API_URL_ACADEMIC;
  public press: number = 0;

  sliderGaleri = {
    zoom: false,
    sliderPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20,
    pager: true
  }

  // Interval function
  protected interval: any;
  constructor(
    public alertCtrl: AlertController,
    private replacePipe: ReplacePipe,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private academic: AcademicService,
    private alertService: AlertService,
    private transfer: FileTransfer,
    private loadingCtrl: LoadingController,
    private file: File,
    private photoViewer: PhotoViewer,
    private alert: AlertService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.data = JSON.parse(params.data);
        this.academic.getCommentByTimelineId(this.data.id).then((comments: any) => {
          this.comments = comments.data;
        })
      }

    });
  }

  ngOnInit() {

  }

  addComment(id) {

    this.academic.addComment(id, this.input.message).then((res: any) => {
      if (res) {
        this.input.message = '';
        this.academic.getCommentByTimelineId(id).then((comments: any) => {
          this.comments = comments.data;
        })
      }
    })
  }
  openPreview(img) {
    // this.modalCtrl.create({
    //   component: ImageModalPage,
    //   componentProps: {
    //     img: img
    //   }
    // }).then(modal => modal.present());
    this.photoViewer.show(this.apiUrl + 'media/view/' + img, img, { share: true });
  }

  download(file) {
    this.storage.get('token').then((token: string) => {


      this.loadingCtrl
        .create({
          message: "Downloading.."
        })
        .then(res => {
          res.present();
        });
      let options: FileUploadOptions = {// add another parameter (opsional)
        headers: { "Authorization": 'Bearer ' + token }
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = this.apiUrl + 'webedu/media/view/' + file;
      fileTransfer.download(url, this.file.dataDirectory + 'file.pdf', true, options).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.loadingCtrl.dismiss();
      }, (error) => {
        this.loadingCtrl.dismiss();
        this.alert.alert("Error :" + JSON.stringify(error));
      });
    })
  }


  onPress($event) {
    console.log("onPress", $event);
    this.startInterval();
  }

  onPressUp($event) {
    console.log("onPressUp", $event);
    this.stopInterval();
  }

  startInterval() {
    const self = this;
    this.interval = setInterval(function () {
      self.press = self.press + 1;

    }, 50);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

}
