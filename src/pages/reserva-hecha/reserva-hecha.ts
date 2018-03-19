import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservaHechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva-hecha',
  templateUrl: 'reserva-hecha.html',
})
export class ReservaHechaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaHechaPage');
  }

  


    goPagina(pagina) {
    this.navCtrl.setRoot(pagina);
    
   //this.navCtrl.push('PerfilCentroPage');
  }

}
