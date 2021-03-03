import { NgModule } from "@angular/core";
import { BrowserModule, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IonicStorageModule } from "@ionic/storage";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopupPage } from "./pages/topup/topup.page";
import { ChangePasswordPage } from "./pages/change-password/change-password.page";
// import { SupportAppPage } from "./pages/support-app/support-app.page";
import { InboxDetailPage } from "./pages/inbox-detail/inbox-detail.page";
import { TopupHistoryPage } from "./pages/topup-history/topup-history.page";
import { Firebase } from "@ionic-native/firebase/ngx";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { BroadcastDetailPage } from "./pages/broadcast-detail/broadcast-detail.page";
import { InfoDetailPage } from "./pages/info-detail/info-detail.page";
import { PipesModule } from "./pipes/pipes.module";
import { InvoiceDetailPage } from "./pages/invoice-detail/invoice-detail.page";
import { BottomSheetComponent, BottomSheetModule } from "ionic-custom-bottom-sheet";

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './translate-config.service';
import { ChangeLanguagePage } from './pages/change-language/change-language.page';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AcademicHomeAddPage } from './pages/academic-home-add/academic-home-add.page';
import { FaqPage } from './pages/faq/faq.page';
import { AcademicHomeUploadPage } from './pages/academic-home-upload/academic-home-upload.page';


import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AcademicHomeAnswerPage } from './pages/academic-home-answer/academic-home-answer.page';

import { TimeagoModule } from 'ngx-timeago';
import { AcademicHomeAddQuestionPage } from './pages/academic-home-add-question/academic-home-add-question.page';
import { AcademicHomeEditQuestionPage } from './pages/academic-home-edit-question/academic-home-edit-question.page';
import { IonicGestureConfig } from './gestures/ionic-gesture-config';
import { AcademicHomeAddClassPage } from './pages/academic-home-add-class/academic-home-add-class.page';
import { AcademicHomeClassPage } from './pages/academic-home-class/academic-home-class.page';
import { AcademicHomeDetailClassPage } from './pages/academic-home-detail-class/academic-home-detail-class.page';
import { AcademicHomeAddStudentPage } from './pages/academic-home-add-student/academic-home-add-student.page';
import { NetworkService } from './services/network.service';
import { Network } from '@ionic-native/network/ngx';
import { DonationDetailPage } from './pages/donation-detail/donation-detail.page';
// import { IonicImageLoader } from 'ionic-image-loader';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { TabsPage } from './pages/tabs/tabs.page';
import { ImageModalPage } from './pages/image-modal/image-modal.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { TopupMerchantPage } from './pages/topup-merchant/topup-merchant.page'
import { NotificationPage } from './pages/notification/notification.page';
import { NotificationDetailPage } from './pages/notification-detail/notification-detail.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { Camera } from '@ionic-native/camera/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { TopupMerchantDetailPage } from './pages/topup-merchant-detail/topup-merchant-detail.page'
import { from } from 'rxjs';
import { SupportAppPage } from "./pages/support-app/support-app.page";
// import { TutorialComponent } from "./components/tutorial/tutorial.component";

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InvoiceInputAmountPage } from "./pages/invoice-input-amount/invoice-input-amount.page";
import { PopoverComponentPageModule } from "./pages/popover-component/popover-component.module";
import { CardSetLimitPage } from "./pages/card-set-limit/card-set-limit.page";
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    // TopupPage,
    TopupHistoryPage,
    AcademicHomeAddPage,
    ChangePasswordPage,
    AcademicHomeUploadPage,
    ChangeLanguagePage,
    AcademicHomeAddQuestionPage,
    // SupportAppPage,
    DonationDetailPage,
    InboxDetailPage,
    BroadcastDetailPage,
    AcademicHomeEditQuestionPage,
    NotificationDetailPage,
    InfoDetailPage,
    AcademicHomeAnswerPage,
    EditProfilePage,
    AcademicHomeAddClassPage,
    AcademicHomeClassPage,
    AcademicHomeDetailClassPage,
    AcademicHomeAddStudentPage,
    FaqPage,
    InvoiceDetailPage,
    ImageModalPage,
    NotificationPage,
    CardSetLimitPage,
    InvoiceInputAmountPage,
    TopupMerchantPage,
    // TutorialComponent,
    TopupMerchantDetailPage
  ],
  entryComponents: [
    // TopupPage,
    TopupHistoryPage,
    ChangePasswordPage,
    EditProfilePage,
    AcademicHomeAddPage,
    ChangeLanguagePage,
    NotificationDetailPage,
    AcademicHomeAnswerPage,
    AcademicHomeAddQuestionPage,
    AcademicHomeAddStudentPage,
    // SupportAppPage,
    AcademicHomeEditQuestionPage,
    AcademicHomeDetailClassPage,
    AcademicHomeAddClassPage,
    AcademicHomeClassPage,
    AcademicHomeUploadPage,
    DonationDetailPage,
    InboxDetailPage,
    BroadcastDetailPage,
    FaqPage,
    NotificationPage,
    InfoDetailPage,
    InvoiceInputAmountPage,
    InvoiceDetailPage,
    BottomSheetComponent,
    ImageModalPage,
    CardSetLimitPage,
    TopupMerchantPage,
    // TutorialComponent,
    TopupMerchantDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PopoverComponentPageModule,
    NgxQRCodeModule,
    TimeagoModule.forRoot(),
    // IonicImageLoader.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    BottomSheetModule,
    IonicStorageModule.forRoot({
      name: "__katalis-mobile",
      driverOrder: ["indexeddb", "sqlite", "websql"],
    }),
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    File,
    BluetoothSerial,
    FileChooser,
    FilePath,
    FileTransfer,
    AndroidPermissions,
    Network,
    Vibration,
    Uid,
    Shake,
    Insomnia,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Firebase,
    // ImagePicker,
    Clipboard, TranslateConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
