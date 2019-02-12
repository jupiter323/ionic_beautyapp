import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public apiProvider: ApiProvider, public loadingCtrl:LoadingController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

 enviarMenssaje() {
    console.log('ionViewDidLoad AjustesPage');
  }


goUso() {
/*
  let alert = this.alertCtrl.create({
    title: 'Terminos de Uso del app',
    subTitle: 'Lorem ipsum dolor sit amet, egestas ipsum turpis volutpat, curabitur arcu ac, donec vestibulum integer mi justo facilisis, est fusce nibh aenean id mauris. Tellus ad vitae lacus maxime, purus nec porttitor convallis, proin faucibus, aliquam mauris. Aenean sed sed vivamus amet. Vel ullamcorper morbi consectetuer consectetuer mollis vivamus, tincidunt vestibulum taciti feugiat est, neque nibh et, fringilla tempor amet nulla, id id et. Pede mollis voluptatem, cursus id rutrum sit, erat nulla suspendisse libero eget. Amet urna arcu tristique, rutrum eget ligula. At sed quis lacinia pellentesque vestibulum, duis sed mi voluptatem, libero morbi ridiculus.',
    buttons: ['Cerrar']
  });
  alert.present();
  */
   window.open("https://www.yourbeauty.com.pa/terminos/",'_system', 'location=yes');
}



bnegocios() {
  let alert = this.alertCtrl.create({
    title: 'Yourbeauty Panamá',
    subTitle: '¿Necesitas asistencia? Escríbenos y te contactaremos a la brevedad posible. <br><br> Email: info@yourbeauty.com.pa' ,
    buttons: ['Cerrar']
  });
  alert.present();
}



notisVerificar(ite){
	 console.log(ite); 
	   this.storage.set(`bypush`, ite);
}



goSobre(){
	// this.navCtrl.push('NosotrosPage'); 
  
   window.open("https://www.yourbeauty.com.pa/",'_system', 'location=yes');
}
goBYN(){
//https://www.yourbeauty.com.pa/negocios/
 window.open("https://www.yourbeauty.com.pa/negocios/",'_system', 'location=yes');
        //this.navCtrl.push('NegocioregistroPage');
}




envioOK() {
  let alert = this.alertCtrl.create({
    title: 'Exito',
    subTitle: 'Tu mensaje ha sido enviado al administrador, gracias por usar nuestro servicio' ,
    buttons: ['Cerrar']
  });
  alert.present();
}

  enviarMensaje() {
  let alert = this.alertCtrl.create({
    title: 'Envianos un mensaje',
    inputs: [
      {
        name: 'mensaje',
        placeholder: 'Escribe tu mensaje aqui'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Enviar',
        handler: data => {
          if (data.mensaje) {
           console.log(data.mensaje);
            // logged in!
            this.envioOK();
          } else {
            // invalid login
            console.log('mensaje vaciui');
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}



}
