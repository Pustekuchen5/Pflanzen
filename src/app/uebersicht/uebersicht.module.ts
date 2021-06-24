import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UebersichtPage } from './uebersicht.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UebersichtRoutingModule } from './uebersicht-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UebersichtRoutingModule
  ],
  declarations: [UebersichtPage]
})
export class UebersichtPageModule { }
