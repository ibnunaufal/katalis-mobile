import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { TranslateConfigService } from 'src/app/translate-config.service';
import { GlobalObservableService } from 'src/app/services/global-observable.service';

@Component({
  selector: "app-intro",
  templateUrl: "./intro.page.html",
  styleUrls: ["./intro.page.scss"],
})
export class IntroPage implements OnInit {
  showSkip = true;
  showCont = false;
  showSwipe = false;
  @ViewChild("slides", { static: true }) slides: IonSlides;

  slideOpts = {
    zoom: false
  };

  selectedLanguage: string;
  constructor(private router: Router,
    private storage: Storage,
    private translateConfigService: TranslateConfigService,
    private globalObservable: GlobalObservableService) {
    this.storage.get('language').then(lang => {
      if (lang) {
        this.selectedLanguage = lang;
      } else {
        this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      }
      console.log(this.selectedLanguage)
    })
    setTimeout(() => {
      this.showSwipe = true;
    }, 1000);
  }

  ngOnInit() {

  }

  startApp() {
    this.router
      .navigateByUrl("/login", { replaceUrl: true })
      .then(() => this.storage.set("did_intro", true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then((isEnd) => {
      this.showSkip = !isEnd;
      this.showCont = isEnd;
    });
  }

  next(slide, index) {
    slide.slideTo(index)
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    var data;
    if (this.selectedLanguage == 'en') {
      data = {
        lang: 'en',
        status: 'true',
      }
    } else {
      data = {
        lang: 'id',
        status: 'true',
      }
    }
    this.storage.set('language', JSON.stringify(data));
  }
}
