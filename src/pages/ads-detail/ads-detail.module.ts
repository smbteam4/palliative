import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsDetailPage } from './ads-detail';

@NgModule({
  declarations: [
    AdsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdsDetailPage),
  ],
})
export class AdsDetailPageModule {}
