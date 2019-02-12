import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleReservaPage } from './detalle-reserva';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    DetalleReservaPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(DetalleReservaPage),
  ],
})
export class DetalleReservaPageModule {}
