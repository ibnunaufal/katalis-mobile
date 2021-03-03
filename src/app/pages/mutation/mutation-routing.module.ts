import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutationPage } from './mutation.page';

const routes: Routes = [
  {
    path: '',
    component: MutationPage,
    children: [
      {
        path: '',
        redirectTo: 'last30-mutation',
        pathMatch: 'full'
      },
      {
        path: 'last30-mutation',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./last30-mutation/last30-mutation.module').then(m => m.Last30MutationPageModule)
          }
        ]
      },
      {
        path: 'older-mutation',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./older-mutation/older-mutation.module').then(m => m.OlderMutationPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'mutation/last30-mutation',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutationPageRoutingModule { }
