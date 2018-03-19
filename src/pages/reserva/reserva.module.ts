import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaPage } from './reserva';

import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    ReservaPage,
  ],
  imports: [
  CalendarModule,
    IonicPageModule.forChild(ReservaPage)
  ],
})
export class ReservaPageModule {}
