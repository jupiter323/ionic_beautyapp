import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';



/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPage');
  }


    actualizarContra(emails){


   let loading = this.loadingCtrl.create({content : "Recuperando ..."});
   loading.present();


    console.log(emails);
      this.apiProvider.recuperarPass({email:emails})
      .then(data => {
      console.log(data);

if(data.data){      
      if(data && data.data.affectedRows>0){
      loading.dismissAll();
		let alert = this.alertCtrl.create({
		title: 'Contraseña Restablecida',
		subTitle: 'Te hemos enviado la contraseña nueva a tu correo' ,
		buttons: ['Cerrar']
		});
		alert.present();
    this.navCtrl.pop();

      } 

      else{
loading.dismissAll();
		let alert = this.alertCtrl.create({
		title: 'Error',
		subTitle: 'Email Invalido' ,
		buttons: ['Cerrar']
		});
		alert.present();

      }
}else{
	loading.dismissAll();
		let alert = this.alertCtrl.create({
		title: 'Error',
		subTitle: 'Error inesperado' ,
		buttons: ['Cerrar']
		});
		alert.present();
}
      });

    }



}










