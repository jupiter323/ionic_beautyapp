import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaPage } from './reserva';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
import { CalendarModule } from 'ion2-calendar';
import { InicioPageModule } from '../inicio/inicio.module';




@NgModule({
  declarations: [
    ReservaPage
  ],
  imports: [
  CalendarModule,
    IonicPageModule.forChild(ReservaPage),
    PipesModule,InicioPageModule
  ],
})
export class ReservaPageModule {}
