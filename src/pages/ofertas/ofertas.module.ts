import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertasPage } from './ofertas';
import { PipesModule } from '../../pipes/pipes.module';//<--- here

@NgModule({
  declarations: [
    OfertasPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertasPage),
    PipesModule
  ],
})
export class OfertasPageModule {}
