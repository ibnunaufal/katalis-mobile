import { Component, OnInit, ViewChild } from '@angular/core';
import { AcademicService } from 'src/app/services/academic.service';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import * as moment from "moment";
import { TimeagoIntl } from 'ngx-timeago';
import { AcademicHomeClassPage } from '../academic-home-class/academic-home-class.page';
import { AcademicHomeAddPage } from '../academic-home-add/academic-home-add.page';
import { Storage } from '@ionic/storage';
import { AcademicHomeAnswerPage } from '../academic-home-answer/academic-home-answer.page';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
@Component({
  selector: 'app-academic-home-detail-class',
  templateUrl: './academic-home-detail-class.page.html',
  styleUrls: ['./academic-home-detail-class.page.scss'],
})
export class AcademicHomeDetailClassPage implements OnInit {
  @ViewChild('slideStatus', { static: false }) slideStatus: IonSlides;
  showClass = false;
  showTimeline = false;
  showDetailTimeline = false;
  loadingShow = false;
  showToolbar = false;
  showToolbarAgain = false;

  slideOpt = {
    initialSlide: 0,
    slidesPerView: 5,
    centeredSlides: false,
    spaceBetween: 2,
    loop: true,
    autoplay: false
  };
  slideOpt2 = {
    initialSlide: 0,
    slidesPerView: 3.5,
    centeredSlides: false,
    spaceBetween: 0,
    loop: true,
    autoplay: false
  };

  data: any;
  detailClass: any;
  classData: any;


  start: number = 0;
  limit: number = 10;
  field: 'tags';
  key: string;
  timelines: any;
  kelas: any;
  temp: any;
  user: string;
  showfilter = true;

  scroll = 0;
  constructor(
    private router: Router,
    private academic: AcademicService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage

  ) {
    this.loadingShow;
    this.classData = this.navParams.get('item');
    // console.log(this.classData);
    this.storage.get('profile').then((profile: any) => {
      console.log(profile)
      if (this.isEmpty(profile.accounts[0].student)) {
        this.user = "employee";
      } else {
        this.user = "student";

      }
      console.log(this.user)
    })
    this.academic.getClassById(this.classData.id).then((res: any) => {
      this.detailClass = res;

      this.academic.getTimeline(this.start, this.limit, this.field, this.classData.id).then((timeline: any) => {

        for (var i = 0; i < timeline.content.length; i++) {
          var d = timeline.content[i].createTime.$date;
          let date = moment(d).format("DD MMM YYYY hh:mm a");
          var fulname = timeline.content[i].accountName;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          timeline.content[i]['newDate'] = date;
          timeline.content[i]['first'] = a;
          timeline.content[i]['second'] = b;

        }
        this.timelines = timeline.content;
        console.log(this.timelines);
        this.showTimeline = true;
        // this.loading.hide();
        this.academic.getClassByClassroomId(this.classData.id).then((kelas: any) => {
          this.temp = kelas;
          for (var i = 0; i < this.temp.content.length; i++) {
            var fulname = this.temp.content[i].name;
            var a = fulname.split(' ')[0];
            var b = fulname.split(' ')[1];
            this.temp.content[i]['first'] = a;
            this.temp.content[i]['second'] = b;
          }
          this.showClass = true;
          this.kelas = this.temp.content;
        })
      })
    })
    this.loadingShow = true;
  }

  ngOnInit() {

  }

  async openAdd(title) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAddPage,
      componentProps: {
        title: title,
      },
    });
    return await modal.present();
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async filter(filter, key) {
    this.start = 0;

    this.showfilter = false;
    this.field = filter;
    this.key = key;
    this.academic
      .getTimeline(this.start, this.limit, this.field, this.key)
      .then((timeline: any = []) => {
        for (var i = 0; i < timeline.content.length; i++) {
          var d = timeline.content[i].createTime.$date;
          let date = moment(d).format("DD MMM YYYY hh:mm a");
          var fulname = timeline.content[i].accountName;
          var a = fulname.split(' ')[0];
          var b = fulname.split(' ')[1];
          timeline.content[i]['newDate'] = date;
          timeline.content[i]['first'] = a;
          timeline.content[i]['second'] = b;
        }
        this.showfilter = true;
        this.timelines = timeline.content;
      })
  }


  async dataKelas(id) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeClassPage,
      componentProps: {
        id: id,
      },
    });
    return await modal.present();
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  async openAnswer(item) {
    const modal = await this.modalCtrl.create({
      component: AcademicHomeAnswerPage,
      componentProps: {
        item: item
      },
    });
    return await modal.present();
  }

  openCommentPage(data) {
    let navigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      },
    };
    this.router.navigate(['academic-home-comment'], navigationExtras);

  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      if (this.scroll == 0) {
        this.scroll = scrollTop;
      }

      this.showToolbar = scrollTop >= 38;
      this.showToolbarAgain = this.scroll > scrollTop;
      this.scroll = scrollTop;

    } else {
      console.log('down');
    }
  }
}
