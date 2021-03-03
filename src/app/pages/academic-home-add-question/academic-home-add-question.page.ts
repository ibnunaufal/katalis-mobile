import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRadioGroup } from '@ionic/angular';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: 'app-academic-home-add-question',
  templateUrl: './academic-home-add-question.page.html',
  styleUrls: ['./academic-home-add-question.page.scss'],
})
export class AcademicHomeAddQuestionPage implements OnInit {
  input: any = [];

  @ViewChild('radioGroup', { static: true }) radioGroup: IonRadioGroup

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  constructor(private modalCtrl: ModalController,
    private globalObservable: GlobalObservableService,) { }

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
    var randomColor = "00000000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    console.log(randomColor)
    var temp = {
      'id': randomColor,
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
      label: "question:got",
      value: temp,
    });
    this.dismiss();
  }
}
