import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {
  selectedLanguage: string;
  constructor(
    private modalCtrl: ModalController,
    private translateConfigService: TranslateConfigService,
    private storage: Storage) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

  }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.storage.set('language', this.selectedLanguage).then(() => { })
  }
}
