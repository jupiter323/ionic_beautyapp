import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogindPage } from './logind';

@NgModule({
  declarations: [
    LogindPage,
  ],
  imports: [
    IonicPageModule.forChild(LogindPage),
  ],
})
export class LogindPageModule {}
