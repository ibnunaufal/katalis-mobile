import { Component, OnInit } from '@angular/core';
import { SheetStates } from 'ionic-custom-bottom-sheet';
import { NavParams, ModalController } from '@ionic/angular';
import { AcademicService } from 'src/app/services/academic.service';
import { AcademicHomeAddStudentPage } from '../academic-home-add-student/academic-home-add-student.page';
import { GlobalObservableService } from 'src/app/services/global-observable.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-academic-home-class',
  templateUrl: './academic-home-class.page.html',
  styleUrls: ['./academic-home-class.page.scss'],
})
export class AcademicHomeClassPage implements OnInit {
  data: any;
  temp: any
  user;
  constructor(
    private navParams: NavParams,
    private academic: AcademicService,
    private modalCtrl: ModalController,
    private globalObservable: GlobalObservableService,
    private storage: Storage
  ) {
    var id = this.navParams.get('id');
    this.storage.get('profile').then((profile: any) => {
      console.log(profile)
      if (this.isEmpty(profile.accounts[0].student)) {
        this.user = "employee";
      } else {
        this.user = "student";

      }

      this.academic.getClassByClassroomId(id).then((res: any) => {
        this.temp = res;
        for (var i = 0; i < this.temp.content.length; i++) {
          var fulname = this.temp.content[i].name;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          this.temp.content[i]['first'] = a;
          this.temp.content[i]['second'] = b;
          console.log(this.temp);
        }
        this.data = this.temp;
      })
    })
    this.globalObservable.getObservable().subscribe(data => {
      // this.loading.show();
      if (data.label == "addStudent:success") {
        this.academic.getClassByClassroomId(id).then((res: any) => {
          this.temp = res;
          for (var i = 0; i < this.temp.content.length; i++) {
            var fulname = this.temp.content[i].name;
            var a = fulname.split(' ')[0];
            var b = fulname.split(' ')[1];
            this.temp.content[i]['first'] = a;
            this.temp.content[i]['second'] = b;
            console.log(this.temp);
          }
          this.data = this.temp;
        })
      }
    })
  }

  ngOnInit() {
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  async addSiswa() {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAddStudentPage,
      componentProps: {
        id: this.navParams.get('id'),
      },
    });
    return await modal.present();
  }


}
