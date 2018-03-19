import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalServicesPage } from './modal-services';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    ModalServicesPage,
  ],
  imports: [
  HttpModule,
    IonicPageModule.forChild(ModalServicesPage),
  ],
})
export class ModalServicesPageModule {}
