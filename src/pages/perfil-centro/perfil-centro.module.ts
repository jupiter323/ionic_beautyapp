import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilCentroPage } from './perfil-centro';

import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    PerfilCentroPage
  ],
  imports: [
  HttpModule,
    IonicPageModule.forChild(PerfilCentroPage),
  ],
})
export class PerfilCentroPageModule {}
