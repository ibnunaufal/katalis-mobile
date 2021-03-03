import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password-otp.page.html',
  styleUrls: ['./forget-password-otp.page.scss'],
})
export class ForgetPasswordOtpPage implements OnInit {
  validationForm: FormGroup;
  data: any;
  validationMessages = {
    otp: [{ type: "required", message: "Email Harap Diisi." }],
  };
  email;
  otp;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email')
    this.validationForm = this.formBuilder.group({
      otp: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
  }

  forgetPassword(values) {
    if (this.validationForm.valid) {
      this.authService.forgetPasswordOtp(this.email, values.otp, '').then((res) => {
        this.router.navigate(["/forget-password-confirmation"], { queryParams: { email: this.email, otp: values.otp } });
      }, (error) => {
        this.alertService.toastError('Kode OTP yang anda masukkan Salah, Silahkan Periksa Kembali')
      })
    }

  }
}
