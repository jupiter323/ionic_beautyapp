import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ListaServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-servicios',
  templateUrl: 'lista-servicios.html',
})
export class ListaServiciosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }



   presentProfileModal() {
   let profileModal = this.modalCtrl.create('BuscarModalPage');
   profileModal.present();
 }


ionViewWillEnter(){
  
      console.log('ionViewDidLoad ListaServiciosPage');
    this.categoriaSeleccionada =  this.navParams.get('nombre');
    console.log(this.categoriaSeleccionada);

    
}

  ionViewDidLoad() {

      this.section="one";

  }

      goCentro() {
     this.navCtrl.push('PerfilCentroPage');  
  		}


  openBusqueda() {
      this.presentProfileModal();
      }

      




}
