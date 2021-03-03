import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AccessService } from 'src/app/services/access.service';
import { AlertService } from "src/app/services/alert.service";
@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit {
  qrData = null;
  scannedCode = null;
  constructor(private barcodeScanner: BarcodeScanner,
    private accessService: AccessService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      console.log(this.scannedCode);
      this.accessService.scanQr(this.scannedCode).then((res: any) => {
        console.log(res);

      })
    })
  }
}
