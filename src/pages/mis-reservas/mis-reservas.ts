import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment';


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

  constructor(public navCtrl: NavController,private DomSanitizer: DomSanitizer, public navParams: NavParams, public modalCtrl: ModalController,  public alertCtrl: AlertController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider) {
   this.reservas=[];


  }





  //ionViewDidLoad() {
  ionViewDidEnter() {
    this.section="one";
    console.log('ionViedLoad MisReservasPage');

        this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.dataUser = data;
      this.getReservas();
      //this.menuActivo = true;
      }
      else{
      console.log('error');
      // this.menuActivo = false;
      } 
      
      
     });


  }

    filterFav(user: any) {
  //console.log(user);
    return user.estado == 1 || user.estado == 2 || user.estado == 5 
    || user.estado == 4
  }

    filterFav2(user: any) {
  //console.log(user);
    return user.estado == 3 || user.estado == 7
  }


      goDetalle(idCita) {


     //this.navCtrl.push('DetalleReservaPage');

       this.navCtrl.push('DetalleReservaPage', {idCita:idCita});


  
      
  }


  getMes(fecha){
    var date = new Date(fecha),
    locale = "es-es",
    month = date.toLocaleString(locale, { month: "short" });
    return month;
  }

  getDia(fecha){

    var date = new Date(fecha),
    day = date.getDate();
    return day; 

  }

  getHora(fecha){

    var date = new Date(fecha),
    hora = date.getHours(),
    min = date.getMinutes();
    return ("0" + hora).slice(-2)+':'+("0" + min).slice(-2); 


  }

getDattt(str){
if(str){
 
  return moment.utc(str).format('h:mm a')

}
else{return ' '}

}


getNumMen(n){
  var num = parseInt(n);
  if(num > 1){
  return num - 1;
  }
  else{return num;}
}
  getReservas(){

    let loading = this.loadingCtrl.create({content : "Cargando"});
    loading.present();


        this.apiProvider.reservasUser({idCliente:this.dataUser.idCliente})
      .then(data => {


       console.log(data);
              if(data){
        this.reservas = data || [];
       }
       else{
       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.ionViewDidEnter.bind(this));
       }

       loading.dismiss();

       
      });

  }

  reintentarAlert(funcionEnviar){

    var mensaje = `<div>  
                      <p>No hemos podido conectar. 
                      Verifica tu conexión a Internet para continuar</p>
                      
                   <div>`;
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: this.DomSanitizer.bypassSecurityTrustHtml(mensaje),
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



  

}
