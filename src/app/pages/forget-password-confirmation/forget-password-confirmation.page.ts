import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password-confirmation.page.html',
  styleUrls: ['./forget-password-confirmation.page.scss'],
})
export class ForgetPasswordConfirmationPage implements OnInit {
  validationForm: FormGroup;
  validationMessages = {
    password: [{ type: "required", message: "Password Harap Diisi." }],
    confirmPassword: [{ type: "required", message: "Konfirmasi Password Harap Diisi." }],
  };
  email;
  otp;

  showPassword = false;
  passwordToggleIcon = "eye-outline";
  showPassword2 = false;
  passwordToggleIcon2 = "eye-outline";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {

    this.otp = this.route.snapshot.queryParamMap.get('otp')
    this.email = this.route.snapshot.queryParamMap.get('email')

    this.validationForm = this.formBuilder.group({
      password: new FormControl("", Validators.compose([Validators.required])),
      confirmPassword: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
  }

  forgetPassword(values) {
    if (this.validationForm.valid) {
      this.authService.forgetPassword(this.email, this.otp, values.password).then((res) => {
        this.alertService.toastSuccess('Ganti Kata Sandi Berhasil,Silahkan Login Kembali.')
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 1500);
      }, (error) => {
        this.alertService.toastError('Password Minimal 6 Karakter, Silahkan Priksa Kembali.')
      })
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
