import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRadioGroup, NavParams } from '@ionic/angular';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: 'app-academic-home-edit-question',
  templateUrl: './academic-home-edit-question.page.html',
  styleUrls: ['./academic-home-edit-question.page.scss'],
})
export class AcademicHomeEditQuestionPage implements OnInit {
  input: any = [];

  @ViewChild('radioGroup', { static: true }) radioGroup: IonRadioGroup

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  data: any;
  constructor(private modalCtrl: ModalController,
    private globalObservable: GlobalObservableService,
    private navParams: NavParams) {
    var temp: any;
    temp = this.navParams.get('item');
    this.data = temp;
    this.input.id = this.data.id;
    this.input.description = this.data.description;
    this.input.opsia = this.data.opsi[0].a;
    this.input.opsib = this.data.opsi[0].b;
    this.input.opsic = this.data.opsi[0].c;
    this.input.opsid = this.data.opsi[0].d;
    this.input.opsie = this.data.opsi[0].e;
    this.selectedRadioGroup = this.data.jawaban;
    console.log(this.data.opsi[0].a);
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }
  addQuestion() {
    var temp = {
      'id': this.input.id,
      'description': this.input.description,
      'opsi': [{
        'a': this.input.opsia,
        'b': this.input.opsib,
        'c': this.input.opsic,
        'd': this.input.opsid,
        'e': this.input.opsie,
      }],
      'jawaban': this.selectedRadioGroup
    }
    this.globalObservable.publish({
      label: "question:edit",
      value: temp,
    });
    this.dismiss();
  }

}
