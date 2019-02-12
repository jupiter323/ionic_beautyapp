import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarModule } from 'ion2-calendar';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from  '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { Ionic2RatingModule } from 'ionic2-rating';



import { Config } from 'ionic-angular';
import { ModalScaleEnterTransition } from '../transitions/on-enter-scale.transition';
import { ModalScaleLeaveTransition } from '../transitions/on-leave-scale.transition';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  
  imports: [
    BrowserModule,
    CalendarModule,
    Ionic2RatingModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp,{mode:'ios', backButtonText: ''}),
     IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {

    constructor(public config: Config) {
      this.setCustomTransitions();
  }

  private setCustomTransitions() {

      this.config.setTransition('modal-scale-up-enter', ModalScaleEnterTransition);
      this.config.setTransition('modal-scale-up-leave', ModalScaleLeaveTransition);
  }


}
