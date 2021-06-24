import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebersichtPage } from './uebersicht.page';

const routes: Routes = [
  {
    path: '',
    component: UebersichtPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebersichtRoutingModule { }
