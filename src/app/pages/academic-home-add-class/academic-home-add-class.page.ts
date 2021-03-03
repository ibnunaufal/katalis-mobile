import { Component, OnInit } from '@angular/core';
import { AcademicService } from 'src/app/services/academic.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: 'app-academic-home-add-class',
  templateUrl: './academic-home-add-class.page.html',
  styleUrls: ['./academic-home-add-class.page.scss'],
})
export class AcademicHomeAddClassPage implements OnInit {
  year: any
  semester: any;
  input: any = [];
  selectedyear: string;
  user;
  constructor(public academic: AcademicService,
    private modalCtrl: ModalController,
    private alert: AlertService,
    private globalObservable: GlobalObservableService,
  ) {
    this.getyear();
    this.getsemester();

  }


  ngOnInit() {
  }


  getyear() {
    this.academic.getComboYear().then((year: any) => {
      for (var i = 0; i < year.data.length; i++) {
        if (year.data[i].active = true) {
          this.input.year = year.data[i].id;
        }
      }
      this.year = year.data;
    })
  }

  getsemester() {
    this.academic.getComboSemester().then((semester: any) => {
      for (var i = 0; i < semester.data.length; i++) {
        if (semester.data[i].active = true) {
          this.input.semester = semester.data[i].id;
        }
      }
      this.semester = semester.data;
    })
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  addClass() {
    this.academic.addClass(this.input.year, this.input.semester, this.input.tingkatan, this.input.classname, this.input.tempclass).then((res: any) => {
      console.log(res);
      this.globalObservable.publish({
        label: "addClass:success"
      });

      this.dismiss();
      this.alert.toastSuccess("Success");
    })
  }
}
