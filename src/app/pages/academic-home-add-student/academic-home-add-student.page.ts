import { Component, OnInit } from '@angular/core';
import { AcademicService } from 'src/app/services/academic.service';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: 'app-academic-home-add-student',
  templateUrl: './academic-home-add-student.page.html',
  styleUrls: ['./academic-home-add-student.page.scss'],
})
export class AcademicHomeAddStudentPage implements OnInit {
  input: any = [];
  id: string;
  constructor(private academic: AcademicService,
    private modalCtrl: ModalController,
    private alert: AlertService,
    private globalObservable: GlobalObservableService,
    private navParams: NavParams) {
    this.id = navParams.get('id');
    console.log("id" + this.id);
  }

  ngOnInit() {
  }


  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }


  addStudent() {
    var data = {
      "nis": this.input.nis,
      "name": this.input.name,
      "phone": this.input.phone,
      "email": this.input.email,
      "classroomId": this.id,
    }
    this.academic.addStudent(data).then((res: any) => {
      if (res.detail) {
        this.alert.toastError(res.detail);
      } else {
        this.globalObservable.publish({
          label: "addStudent:success"
        });

        this.dismiss();
        this.alert.toastSuccess("Success");
      }
    })
  }
}
