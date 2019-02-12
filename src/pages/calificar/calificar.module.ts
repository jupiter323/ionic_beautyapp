import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalificarPage } from './calificar';
import { Ionic2RatingModule } from 'ionic2-rating';

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/es';

registerLocaleData(localeFr, 'es');

@NgModule({
  declarations: [
    CalificarPage,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  imports: [
    IonicPageModule.forChild(CalificarPage),
    Ionic2RatingModule
  ],
})
export class CalificarPageModule {}
