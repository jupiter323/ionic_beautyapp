import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpinionesPage } from './opiniones';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
import { Ionic2RatingModule } from 'ionic2-rating';


import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/es';

registerLocaleData(localeFr, 'es');



@NgModule({
  declarations: [
    OpinionesPage,
  ],
    providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  imports: [

    IonicPageModule.forChild(OpinionesPage),
    Ionic2RatingModule,
    PipesModule
  ],
})
export class OpinionesPageModule {}
