import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarModalPage } from './buscar-modal';
import { CalendarModule } from 'ion2-calendar';
@NgModule({
  declarations: [
    BuscarModalPage,
  ],
  imports: [
 	 CalendarModule,
    IonicPageModule.forChild(BuscarModalPage),
  ],
})
export class BuscarModalPageModule {}
