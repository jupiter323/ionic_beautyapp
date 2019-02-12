import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservapaquetePage } from './reservapaquete';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
import { CalendarModule } from 'ion2-calendar';
import { InicioPageModule } from '../inicio/inicio.module';


@NgModule({
  declarations: [
    ReservapaquetePage,
  ],
  imports: [
  CalendarModule,
    IonicPageModule.forChild(ReservapaquetePage),
        PipesModule,InicioPageModule
  ],
})
export class ReservapaquetePageModule {}
