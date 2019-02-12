import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaServiciosPage } from './lista-servicios';
import { PipesModule } from '../../pipes/pipes.module';//<--- here


@NgModule({
  declarations: [
    ListaServiciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaServiciosPage),
    PipesModule
  ],
})
export class ListaServiciosPageModule {}
