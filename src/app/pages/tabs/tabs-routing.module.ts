import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../home/home.module").then(m => m.HomePageModule)
          },
          {
            path: "account",
            children: [
              {
                path: "",
                loadChildren: () =>
                  import("../account/account.module").then(
                    m => m.AccountPageModule
                  )
              }
            ]
          },
          {
            path: "",
            loadChildren: () =>
              import("../invoice/invoice.module").then(m => m.InvoicePageModule)
          },
          {
            path: "service",
            loadChildren: () =>
              import("../service/service.module").then(m => m.ServicePageModule)
          },
          {
            path: "support",
            loadChildren: () =>
              import("../support/support.module").then(m => m.SupportPageModule)
          },
          {
            path: "card",
            loadChildren: () =>
              import("../card/card.module").then(m => m.CardPageModule)
          },
          {
            path: "shop",
            loadChildren: () =>
              import("../shop/shop.module").then(m => m.ShopPageModule)
          },
          {
            path: "mutation",
            loadChildren: () =>
              import("../mutation/mutation.module").then(
                m => m.MutationPageModule
              )
          },
          {
            path: "trx",
            loadChildren: () =>
              import("../trx/trx.module").then(m => m.TrxPageModule)
          },
          {
            path: "donation",
            loadChildren: () =>
              import("../donation/donation.module").then(m => m.DonationPageModule)
          },
          {
            path: "attendance",
            loadChildren: () =>
              import("../attendance/attendance.module").then(m => m.AttendancePageModule)
          },
          {
            path: "smart-access",
            loadChildren: () =>
              import("../smart-access/smart-access.module").then(m => m.SmartAccessPageModule)
          }
        ]
      },
      {
        path: "info",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../info/info.module").then(m => m.InfoPageModule)
          }
        ]
      },
      {
        path: "inbox",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../inbox/inbox.module").then(m => m.InboxPageModule)
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(m => m.ProfilePageModule)
          }
        ]
      },

    ]
  },
  {
    path: "",
    redirectTo: "/app/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
