import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InvoicePage } from "./invoice.page";

const routes: Routes = [
  {
    path: "invoice",
    component: InvoicePage,
    children: [
      {
        path: "",
        redirectTo: "invoice-unpaid",
        pathMatch: "full"
      },
      {
        path: "invoice-unpaid",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../invoice/invoice-unpaid/invoice-unpaid.module").then(
                m => m.InvoiceUnpaidPageModule
              )
          }
        ]
      },
      {
        path: "invoice-history",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../invoice/invoice-history/invoice-history.module").then(
                m => m.InvoiceHistoryPageModule
              )
          }
        ]
      },
      {
        path: "invoice-summary",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../invoice/invoice-summary/invoice-summary.module").then(
                m => m.InvoiceSummaryPageModule
              )
          }
        ]
      }
    ]
  },
  {
    path: "",
    redirectTo: "invoice/invoice-unpaid",
    pathMatch: "full"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicePageRoutingModule {}
