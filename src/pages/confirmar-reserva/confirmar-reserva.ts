import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfirmarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmar-reserva',
  templateUrl: 'confirmar-reserva.html',
})
export class ConfirmarReservaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmarReservaPage');
  }


       confirmacionLista() {
   //   this.navCtrl.push('ReservaHechaPage');
  this.navCtrl.setRoot('ReservaHechaPage');
      
  }



}
