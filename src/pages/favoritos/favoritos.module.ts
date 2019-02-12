import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritosPage } from './favoritos';
import { PipesModule } from '../../pipes/pipes.module';//<--- here
@NgModule({
  declarations: [
    FavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritosPage),
    PipesModule
  ],
})
export class FavoritosPageModule {}
