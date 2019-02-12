import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisReservasPage } from './mis-reservas';
import { PipesModule } from '../../pipes/pipes.module';//<--- here

@NgModule({
  declarations: [
    MisReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(MisReservasPage),
    PipesModule
  ],
})
export class MisReservasPageModule {}
