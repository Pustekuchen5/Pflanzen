import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SteckbriefPage } from './steckbrief.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SteckbriefRoutingModule } from './steckbrief-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: SteckbriefPage }]),
    SteckbriefRoutingModule,
  ],
  declarations: [SteckbriefPage]
})
export class SteckbriefPageModule { }
