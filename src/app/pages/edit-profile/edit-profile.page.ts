import { Component, NgZone, OnInit } from "@angular/core";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from "@ionic-native/file-transfer/ngx";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from "@ionic/angular";

import { Clipboard } from "@ionic-native/clipboard/ngx";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { GlobalObservableService } from "src/app/services/global-observable.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { stringify } from 'querystring';
// import { url } from 'inspector';
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  clickedImage: string;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  FileURI: any;
  FileName: string = "";
  show = false;
  responsePhoto: any;
  input: any = [];
  profile: any;
  apiUrl = environment.API_URL;
  constructor(
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
    private transfer: FileTransfer,
    private loading: LoadingController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private zone: NgZone,
    private userService: UserService,
    private globalObservable: GlobalObservableService,
    private clipboard: Clipboard,
    private alertService: AlertService,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private domSanitizer: DomSanitizer
  ) {
    console.log("file" + this.FileName);
    this.storage.get("profile").then((res: any) => {
      this.profile = res;
      this.input.email = res.email;
      this.input.phone = res.phone;
    });
  }

  ngOnInit() { }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  isEmail(search: string): boolean {
    var serchfind: boolean;

    var regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    serchfind = regexp.test(search);

    // console.log(serchfind)
    return serchfind;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Change photo profile",
      cssClass: "my-custom-class",
      buttons: [
        // {
        //   text: 'Take Photo',
        //   icon: 'camera-outline',
        //   handler: () => {
        //     this.takePhoto();
        //   }
        // },
        {
          text: "Get Photo From Library",
          icon: "image-outline",
          handler: () => {
            this.chooseFile();
          },
        },
        {
          text: "Cancel",
          role: "cancel", // will always sort to be on the bottom
          icon: "close-outline",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  save() {
    // console.log(this.isEmail(this.input.email));
    if (this.isEmail(this.input.email)) {
      // this.profile.photoUrl = this.responsePhoto.name;
      this.profile.email = this.input.email;
      this.profile.phone = this.input.phone;
      var data = this.profile;
      this.userService.updateUser(data).then((res) => {
        this.userService.tokenCheck().then((response: any) => {
          this.storage.set("profile", response.body.user).then((profile) => {
            this.globalObservable.publish({
              label: "profile:change",
              value: profile,
            });
          });
        });
      });
      this.alertService.toastSuccess("Success update data");
    } else if (this.input.email < 6) {
      this.alertService.toastError(
        "Email should be between 5 and 50 characters"
      );
    } else {
      this.alertService.toastError("Invalid input form");
    }
  }

  takePhoto() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.clickedImage = base64Image;
        this.clipboard.copy(imageData);
        this.alertService.alert(imageData);
      },
      (err) => {
        console.log(err);
        // Handle error
      }
    );
  }

  chooseFile() {
    //get file with cordova file chooser
    this.fileChooser
      .open()
      .then((uri) => {
        //file uri for upload
        this.FileURI = uri;
        this.filePath
          .resolveNativePath(uri) //get file path
          .then((filePath) => {
            this.file.resolveLocalFilesystemUrl(filePath).then(
              (
                fileInfo //get info file
              ) => {
                let files = fileInfo as FileEntry;
                files.file((success) => {
                  this.zone.run(() => {
                    //updating binding file name
                    this.FileName = success.name; //get file name
                  });
                });
              },
              (err) => {
                console.log(err);
                throw err;
              }
            );
          });
        this.show = true;
      })
      .catch((e) => console.log(e));
    // this.UploadFile();
  }

  UploadFile() {
    this.storage.get("token").then((token: string) => {
      // show loading spinner
      this.loading
        .create({
          message: "Uploading.."
        })
        .then(res => {
          res.present();
        });

      const fileTransfer: FileTransferObject = this.transfer.create();
      //Local PC Web service if using an emulator
      let URL = this.apiUrl + "main_a/image/uploadimage";

      //Local PC Web service if using the real device and in one network
      //let URL="http://192.168.99.187/upload-file-ionic/upload.php";

      //option upload
      // let options: FileUploadOptions = {
      //   fileKey: 'file',
      //   fileName: this.imageFileName,
      //   chunkedMode: false,
      //   mimeType: "image/jpeg",
      //   headers: {}
      // }

      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.FileName,
        chunkedMode: false,
        mimeType: 'image/jpeg',
        params: { fileName: this.FileName }, // add another parameter (opsional)
        headers: { Authorization: 'Bearer ' + token },
      }
      // this.alertService.alert(JSON.stringify(options));
      fileTransfer.upload(this.FileURI, URL, options)
      .then(
        (data: any) => {
           console.log(data);
          this.loading.dismiss();
          
          this.responsePhoto = JSON.parse(data.response);
          // this.clipboard.copy(JSON.parse(data.response));
          this.FileName = "";
          this.presentToast("File uploaded successfully");

          this.profile.photoUrl = this.responsePhoto.name;
          var data = this.profile;

          this.userService.updateUser(data).then((res) => {
            this.userService.tokenCheck().then((response: any) => {
              this.storage
                .set("profile", response.body.user)
                .then((profile) => {
                  this.globalObservable.publish({
                    label: "profile:change",
                    value: profile,
                  });
                });
              this.show = false;
            });
          });
        }
         
        
      ),
      (err) => {
        // alert(stringify(err));
        this.loading.dismiss();
        this.clipboard.copy(JSON.stringify(err));
        this.alertService.alert("Error, Please try again.");
     
      }
    },
   );
  }

  presentToast(msg) {
    this.alertService.toast(msg);
  }

  getImgContent(): SafeUrl {
    var img;
    img = this.apiUrl + 'main_a/image/get/' + this.profile.photoUrl + '/pas';
    return this.domSanitizer.bypassSecurityTrustUrl(img);

  }

}
