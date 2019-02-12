import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuponesPage } from './cupones';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
@NgModule({
  declarations: [
    CuponesPage,
  ],
  imports: [
    IonicPageModule.forChild(CuponesPage),
    PipesModule
  ],
})
export class CuponesPageModule {}
