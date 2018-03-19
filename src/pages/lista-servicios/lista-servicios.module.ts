import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaServiciosPage } from './lista-servicios';

@NgModule({
  declarations: [
    ListaServiciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaServiciosPage),
  ],
})
export class ListaServiciosPageModule {}
