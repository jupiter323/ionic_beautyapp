import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CongratsPage } from './congrats';

@NgModule({
  declarations: [
    CongratsPage,
  ],
  imports: [
    IonicPageModule.forChild(CongratsPage),
  ],
})
export class CongratsPageModule {}
