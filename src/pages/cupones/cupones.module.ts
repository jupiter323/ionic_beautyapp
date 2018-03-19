import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuponesPage } from './cupones';

@NgModule({
  declarations: [
    CuponesPage,
  ],
  imports: [
    IonicPageModule.forChild(CuponesPage),
  ],
})
export class CuponesPageModule {}
