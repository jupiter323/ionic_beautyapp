import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpinionesPage } from './opiniones';

@NgModule({
  declarations: [
    OpinionesPage,
  ],
  imports: [
    IonicPageModule.forChild(OpinionesPage),
  ],
})
export class OpinionesPageModule {}
