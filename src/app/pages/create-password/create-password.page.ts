import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertService } from "src/app/services/alert.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { BalanceService } from "src/app/services/balance.service";
import { FcmService } from "src/app/services/fcm.service";
import { GlobalObservableService } from "src/app/services/global-observable.service";
import { LoadingService } from "src/app/services/loading.service";

@Component({
  selector: "app-create-password",
  templateUrl: "./create-password.page.html",
  styleUrls: ["./create-password.page.scss"],
})
export class CreatePasswordPage implements OnInit {
  data: any;
  validationForm: FormGroup;

  validationMessages = {
    password: [{ type: "required", message: "Password harap diisi." }],
    confirmPassword: [
      { type: "required", message: "Ulangi Password harap diisi." },
    ],
  };

  showPassword = false;
  passwordToggleIcon = "eye-outline";
  showPassword2 = false;
  passwordToggleIcon2 = "eye-outline";

  email;
  phone;

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private authentication: AuthenticationService,
    private alertService: AlertService,
    public navCtrl: NavController,
    private balance: BalanceService,
    private globalObservable: GlobalObservableService,
    private storage: Storage,
    private route: ActivatedRoute,
    private fcm: FcmService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data["param"]) {
      this.data = this.route.snapshot.data["param"];
      this.email = this.data.user.email;
      this.phone = this.data.user.phone;

    }

    this.validationForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.nullValidator])),
      phone: new FormControl("", Validators.compose([Validators.nullValidator])),
      password: new FormControl("", Validators.compose([Validators.required])),
      confirmPassword: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  createPassword(values) {
    if (this.validationForm.valid) {
      if (values.password != values.confirmPassword) {
        this.alertService.alert("Password tidak sama");
      } else {
        // this.loading.show();
        // console.log(values);
        let data = {
          dateOfBirth: this.data.user.dateOfBirth,
          email: values.email,
          name: this.data.user.name,
          password: values.password,
          phone: values.phone,
        };
        // console.log(this.data);
        // console.log('tes')
        // this.loading.hide();
        this.authentication.createPassword(data).then((response) => {
          this.globalObservable.publish({
            label: "createpass:success",
            value: response,
          });
          this.alertService.toastSuccess("Please Logged In.");
          this.navCtrl.navigateRoot("/login");
        },
          (error: any) => {
            // this.loading.hide()
            this.alertService.popoverError("Error", error.split('Message:').pop())

          }
        );
      }
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = "eye-outline";
    }
  }
  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
    if (this.passwordToggleIcon2 == 'eye-outline') {
      this.passwordToggleIcon2 = 'eye-off-outline';
    } else {
      this.passwordToggleIcon2 = "eye-outline";
    }
  }
}
