import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  // @ViewChild('slider', { read: typeof ElementRef, static: false }) slider: ElementRef;
  // img: any;
  // slideOpts = {
  //   zoom: {
  //     maxRatio: 5
  //   }
  // }
  // apiUrl = environment.API_URL_ACADEMIC;
  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  ngOnInit() {
    // this.img = this.navParams.get('img');
  }

  // zoom(zoomIn: boolean) {
  //   let zoom = this.slider.nativeElement.zoom;
  //   if (zoomIn) {
  //     zoom.In();
  //   } else {
  //     zoom.Out();
  //   }

  // }
  // close() {
  //   this.modalController.dismiss();
  // }
}
