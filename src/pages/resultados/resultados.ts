import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';



import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import * as moment from 'moment';


/**
 * Generated class for the ResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public apiProvider: ApiProvider, public loadingController:LoadingController, public events: Events) {

  this.filtro = {};
  this.resultados = [];
  this.categorias=['Peluqueria','Rostro y Cuerpo','Uñas','Masaje','Depilacion','Bienestar','Paquetes','Ofertas'];
this.categoriaSeleccionada =0;
this.cargaData = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadosPage');
          this.resultados =  this.navParams.get('resultados');
this.filtro =  this.navParams.get('filtro');
          console.log(this.navParams.get('filtro'));
          this.cargaData = true;
  }

  getFF(fec){

  if(fec){
    moment.locale('es');
  return moment(fec, 'YYYY-MM-DD').format('ll');
  }
  else{
  return 'fecha';
  }
  


  }

getDataFormatMM(hora){
 return hora.replace(/-/g, "/");
}

       goCentro(idCentro) {
    // this.navCtrl.push('PerfilCentroPage');  
       this.navCtrl.push('PerfilCentroPage', {'idCentro':idCentro, 'idServicioSeleccionado':this.categoriaSeleccionada});
  		}



}
