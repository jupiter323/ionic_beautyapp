import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


    goServicio(nombreServicio){

  this.navCtrl.push('ListaServiciosPage',{nombre:nombreServicio});

  }



}
