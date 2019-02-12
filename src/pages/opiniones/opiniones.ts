import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the OpinionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opiniones',
  templateUrl: 'opiniones.html',
})
export class OpinionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController,private sanitizer: DomSanitizer) {
  }

/*
  ionViewDidLoad() {

    }
*/
  ionViewDidLoad() {
    this.section = "one";
    console.log('ionViewDidLoad OpinionesPage');


        this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.dataUser = data;
      //this.menuActivo = true;
      }
      else{
      console.log('error');

      // this.menuActivo = false;
      } 
      
      this.getOpiniones(this.dataUser.idCliente);
     });

  }


    reintentarAlert(funcionEnviar){

    var mensaje = `<div>  
                      <p>No hemos podido conectar. 
                      Verifica tu conexión a Internet para continuar</p>
                      
                   <div>`;
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje),
       buttons: [
 
           {
        text: 'Reintentar',
        handler: () => {
          funcionEnviar();
        }
      },
    ],
      enableBackdropDismiss: false
    });
    alert.present();

  }



  filterFav(user: any) {
  //console.log(user);
    return user.estado == 1
  }


  filterFav2(user: any) {
  //console.log(user);
    return user.estado == 2
  }

evaluar(n) {

var dataE = n;
dataE.tipo=0;

this.navCtrl.push('CalificarPage', n);

}

verOpinion(n) {

var dataE = n;
dataE.tipo=1;

this.navCtrl.push('CalificarPage', n);

}


  irReserva(id) {
   this.navCtrl.push('DetalleReservaPage', {idCita:id});
  }



  getOpiniones(idCliente) {

      let loading = this.loadingCtrl.create({content : "Cargando"});
    loading.present();


		let dataE = {idCliente:idCliente};
      console.log(dataE);
        this.apiProvider.getOpiniones(dataE)
      .then(data => {
       loading.dismiss();
       console.log(data);
              if(data){

         this.opiniones = data || [];
       }
       else{
       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.ionViewDidLoad.bind(this));
       }

       
      });
  }

}
