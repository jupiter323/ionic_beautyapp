import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaquetesPage } from './paquetes';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
@NgModule({
  declarations: [
    PaquetesPage,
  ],
  imports: [
    IonicPageModule.forChild(PaquetesPage),
    PipesModule
  ],
})
export class PaquetesPageModule {}
