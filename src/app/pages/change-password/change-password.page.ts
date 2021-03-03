import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { LoadingService } from "src/app/services/loading.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  validationForm: FormGroup;

  validationMessages = {
    oldPass: [{ type: "required", message: "Password lama harap diisi." }],
    newPass: [{ type: "required", message: "Password baru harap diisi." }],
    rePass: [
      { type: "required", message: "Ulangi password baru harap diisi." },
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private authentication: AuthenticationService,
    private alertService: AlertService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      oldPass: new FormControl("", Validators.compose([Validators.required])),
      newPass: new FormControl("", Validators.compose([Validators.required])),
      rePass: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  changePassword(values) {
    if (this.validationForm.valid) {
      if (values.newPass != values.rePass) {
        this.alertService.alert("Password tidak sama.");
      } else {
        this.loading.show();
        this.authentication.changePassword(values.oldPass, values.newPass).then(
          (response: any) => {
            this.loading.hide();
            this.alertService.toastSuccess("Password berhasil diubah.");
            this.dismiss();
          },
          (error) => {
            this.loading.hide();
            this.alertService.alert(error);
          }
        );
      }
    }
  }
}
