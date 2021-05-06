import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubDetailPage } from './sub-detail';

@NgModule({
  declarations: [
    SubDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SubDetailPage),
  ],
})
export class SubDetailPageModule {}
