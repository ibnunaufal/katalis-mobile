import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { AuthGuardService } from "./services/auth-guard.service";
import { CheckIntroService } from "./providers/check-intro.service";
import { DataResolverService } from "./services/data-resolver.service";

const routes: Routes = [
  { path: "", redirectTo: "intro", pathMatch: "full" },
  {
    //TODO: change to academic-home
    path: "app",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "support-app",
    loadChildren: () =>
      import("./pages/support-app/support-app.module").then(
        (m) => m.SupportAppPageModule
      ),
  },
  {
    path: "intro",
    loadChildren: () =>
      import("./pages/intro/intro.module").then((m) => m.IntroPageModule),
    canLoad: [CheckIntroService],
  },
  {
    path: "topup",
    loadChildren: () =>
      import("./pages/topup/topup.module").then((m) => m.TopupPageModule),
  },
  {
    path: "trx-detail",
    loadChildren: () =>
      import("./pages/trx-detail/trx-detail.module").then(
        (m) => m.TrxDetailPageModule
      ),
  },
  {
    path: "change-password",
    loadChildren: () =>
      import("./pages/change-password/change-password.module").then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: "inbox-detail",
    loadChildren: () =>
      import("./pages/inbox-detail/inbox-detail.module").then(
        (m) => m.InboxDetailPageModule
      ),
  },
  {
    path: "topup-history",
    loadChildren: () =>
      import("./pages/topup-history/topup-history.module").then(
        (m) => m.TopupHistoryPageModule
      ),
  },
  {
    path: "support-app",
    loadChildren: () =>
      import("./pages/support-app/support-app.module").then(
        (m) => m.SupportAppPageModule
      ),
  },
  {
    path: "invoice-detail",
    loadChildren: () =>
      import("./pages/invoice-detail/invoice-detail.module").then(
        (m) => m.InvoiceDetailPageModule
      ),
  },
  {
    path: "invoice-summary-detail",
    loadChildren: () =>
      import(
        "./pages/invoice-summary-detail/invoice-summary-detail.module"
      ).then((m) => m.InvoiceSummaryDetailPageModule),
  },
  {
    path: "info-detail",
    loadChildren: () =>
      import("./pages/info-detail/info-detail.module").then(
        (m) => m.InfoDetailPageModule
      ),
  },
  {
    path: "create-password/:id",
    resolve: {
      param: DataResolverService,
    },
    loadChildren: () =>
      import("./pages/create-password/create-password.module").then(
        (m) => m.CreatePasswordPageModule
      ),
  },
  {
    path: 'trx-filter',
    loadChildren: () => import('./pages/trx-filter/trx-filter.module').then(m => m.TrxFilterPageModule)
  },
  {
    path: 'change-language',
    loadChildren: () => import('./pages/change-language/change-language.module').then(m => m.ChangeLanguagePageModule)
  },
  {
    path: 'academic-home',
    loadChildren: () => import('./pages/academic-home/academic-home.module').then(m => m.AcademicHomePageModule)
  },
  {
    path: 'topup',
    loadChildren: () => import('./pages/topup/topup.module').then(m => m.TopupPageModule)
  },
  {
    path: 'academic-home-comment',
    loadChildren: () => import('./pages/academic-home-comment/academic-home-comment.module').then(m => m.AcademicHomeCommentPageModule)
  },
  {
    path: 'academic-home-add',
    loadChildren: () => import('./pages/academic-home-add/academic-home-add.module').then(m => m.AcademicHomeAddPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'academic-home-upload',
    loadChildren: () => import('./pages/academic-home-upload/academic-home-upload.module').then(m => m.AcademicHomeUploadPageModule)
  },
  {
    path: 'academic-home-answer',
    loadChildren: () => import('./pages/academic-home-answer/academic-home-answer.module').then(m => m.AcademicHomeAnswerPageModule)
  },
  {
    path: 'academic-home-add-question',
    loadChildren: () => import('./pages/academic-home-add-question/academic-home-add-question.module').then(m => m.AcademicHomeAddQuestionPageModule)
  },
  {
    path: 'academic-home-edit-question',
    loadChildren: () => import('./pages/academic-home-edit-question/academic-home-edit-question.module').then(m => m.AcademicHomeEditQuestionPageModule)
  },
  {
    path: 'academic-home-add-class',
    loadChildren: () => import('./pages/academic-home-add-class/academic-home-add-class.module').then(m => m.AcademicHomeAddClassPageModule)
  },
  {
    path: 'academic-home-detail-class',
    loadChildren: () => import('./pages/academic-home-detail-class/academic-home-detail-class.module').then(m => m.AcademicHomeDetailClassPageModule)
  },
  {
    path: 'academic-home-add-student',
    loadChildren: () => import('./pages/academic-home-add-student/academic-home-add-student.module').then(m => m.AcademicHomeAddStudentPageModule)
  },
  {
    path: 'exam-data',
    loadChildren: () => import('./pages/exam-data/exam-data.module').then(m => m.ExamDataPageModule)
  },
  {
    path: 'profile-detail',
    loadChildren: () => import('./pages/profile-detail/profile-detail.module').then(m => m.ProfileDetailPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then(m => m.ImageModalPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'practise-data',
    loadChildren: () => import('./pages/practise-data/practise-data.module').then(m => m.PractiseDataPageModule)
  },
  {
    path: 'notification-detail',
    loadChildren: () => import('./pages/notification-detail/notification-detail.module').then(m => m.NotificationDetailPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule)
  },
  {
    path: 'forget-password-confirmation',
    loadChildren: () => import('./pages/forget-password-confirmation/forget-password-confirmation.module').then(m => m.ForgetPasswordConfirmationPageModule)
  },
  {
    path: 'forget-password-otp',
    loadChildren: () => import('./pages/forget-password-otp/forget-password-otp.module').then(m => m.ForgetPasswordOtpPageModule)
  },
  {
    path: 'donation',
    loadChildren: () => import('./pages/donation/donation.module').then(m => m.DonationPageModule)
  },
  {
    path: 'donation-detail',
    loadChildren: () => import('./pages/donation-detail/donation-detail.module').then(m => m.DonationDetailPageModule)
  },
  {
    path: 'topup-merchant',
    loadChildren: () => import('./pages/topup-merchant/topup-merchant.module').then(m => m.TopupMerchantPageModule)
  },
  {
    path: 'topup-merchant-detail',
    loadChildren: () => import('./pages/topup-merchant-detail/topup-merchant-detail.module').then(m => m.TopupMerchantDetailPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendancePageModule)
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'smart-access',
    loadChildren: () => import('./pages/smart-access/smart-access.module').then( m => m.SmartAccessPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./pages/scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'smart-access',
    loadChildren: () => import('./pages/smart-access/smart-access.module').then( m => m.SmartAccessPageModule)
  },
  {
    path: 'invoice-input-amount',
    loadChildren: () => import('./pages/invoice-input-amount/invoice-input-amount.module').then( m => m.InvoiceInputAmountPageModule)
  },
  {
    path: 'popover-component',
    loadChildren: () => import('./pages/popover-component/popover-component.module').then( m => m.PopoverComponentPageModule)
  },
  {
    path: 'card-set-limit',
    loadChildren: () => import('./pages/card-set-limit/card-set-limit.module').then( m => m.CardSetLimitPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
