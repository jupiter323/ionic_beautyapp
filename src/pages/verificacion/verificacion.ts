import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the VerificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
})
export class VerificacionPage {



  dataUserV : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public storage: Storage,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPage');
    console.log(this.navParams.data.idCliente);

       let loading = this.loadingCtrl.create({content : "Cargando"});
    loading.present();

        this.apiProvider.getUserInfo({idCliente:this.navParams.data.idCliente})
    .then(data => { 

      console.log(data);

      if(data && data[0]){

      this.dataUserV = data[0];

      } 

    

      else{
      console.log('error');
             //loading.dismiss();
      } 
        loading.dismiss();
      
     });


  }
goAtras(){
   this.navCtrl.pop();
}


    actualizarContra(emails){


   let loading = this.loadingCtrl.create({content : "Verificando ..."});
   loading.present();


    console.log(emails);
      this.apiProvider.verificarCuenta({codigo:emails, email:this.dataUserV.idCliente})
      .then(data => {
      console.log(data);

if(data &&  data.data &&  data.data.affectedRows>0){      
     console.log(data);
     loading.dismissAll();
     this.verificacionOK();
}else{
	loading.dismissAll();
		let alert = this.alertCtrl.create({
		title: 'Codigo invalido',
		subTitle: 'La cuenta no ha podido ser verificada' ,
		buttons: ['Cerrar']
		});
		alert.present();
}
      });

    }



verificacionOK = () =>{
  
        this.storage.get('pushKeyBY').then((value) => {
        if(value){
        console.log(value);
                var pushState = { 
                pushK:value, 
                device: device.platform,
                deviceId: device.uuid,
                login: Date.now(),
                user: this.dataUserV.idCliente
                }
                console.log(pushState);
              this.apiProvider.addPush(pushState).then(data => {
              console.log(data); 
              });
        }
        
          //value;

        });
   

        
        this.storage.set(`usr_tok_by`, this.dataUserV);
        this.events.publish('userCreated', this.dataUserV);
      
        this.events.publish('loginOK');
            this.navCtrl.pop();



      }



}

