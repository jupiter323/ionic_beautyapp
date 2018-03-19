import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertasPage } from './ofertas';

@NgModule({
  declarations: [
    OfertasPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertasPage),
  ],
})
export class OfertasPageModule {}
