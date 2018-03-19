import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MisReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-reservas',
  templateUrl: 'mis-reservas.html',
})
export class MisReservasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }


  ionViewDidLoad() {
    this.section="one";
    console.log('ionViedLoad MisReservasPage');
  }

      goDetalle() {
     this.navCtrl.push('DetalleReservaPage');
  
      
  }




  

}
