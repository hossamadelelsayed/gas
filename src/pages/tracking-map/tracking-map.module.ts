import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingMapPage } from './tracking-map';

@NgModule({
  declarations: [
    TrackingMapPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingMapPage),
  ],
})
export class TrackingMapPageModule {}
