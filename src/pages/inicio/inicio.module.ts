import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioPage } from './inicio';

import { SelectAlertless } from '../select/selectalertless';



@NgModule({
  declarations: [
    InicioPage,SelectAlertless
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
  ],
  exports: [ SelectAlertless ]
})
export class InicioPageModule {}
