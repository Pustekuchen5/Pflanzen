import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'uebersicht',
        loadChildren: () => import('../uebersicht/uebersicht.module').then(m => m.UebersichtPageModule)
      },
      {
        path: 'steckbrief',
        loadChildren: () => import('../steckbrief/steckbrief.module').then(m => m.SteckbriefPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/uebersicht/',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/uebersicht',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
