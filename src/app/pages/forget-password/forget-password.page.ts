import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from "../../services/authentication.service";
import { AlertService } from "../../services/alert.service";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  validationForm: FormGroup;
  validationMessages = {
    email: [{ type: "required", message: "Email Harap Diisi." }],
  };
  email;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {


    this.validationForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
  }

  forgetPassword(values) {
    if (this.validationForm.valid) {
      this.authService.forgetPassword(values.email, '', '').then((res) => {
        this.router.navigate(["/forget-password-otp"], { queryParams: { email: this.email } });
      }, (error => {
        this.alertService.toastError('Email yang Anda Masukkan Salah, Silahkan Periksa Kembali.')
      }))
    }

  }
}
