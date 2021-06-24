import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteckbriefPage } from './steckbrief.page';

const routes: Routes = [
  {
    path: '',
    component: SteckbriefPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SteckbriefRoutingModule { }
