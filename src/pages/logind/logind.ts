import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-logind',
  templateUrl: 'logind.html',
})
export class LogindPage {

  authForm: FormGroup;




  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public formBuilder: FormBuilder, public loadingCtrl: LoadingController,public events: Events, public alertCtrl: AlertController,public menuCtrl: MenuController, public viewCtrl : ViewController,public apiProvider: ApiProvider, private sanitizer: DomSanitizer) {

this.totalCompra =  this.navParams.get('total'); 

        
        this.authForm = formBuilder.group({
            nombre: ['', Validators.compose([Validators.required])],
            telefono: [''],
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }




goLo(){
this.closeModal();
	this.menuCtrl.open();
}

public closeModal(){
 //	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
}

    presentAlert(titulo,mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Cerrar']
    });
    alert.present();
  }

    presentAlert2(mensaje) {
    let alert = this.alertCtrl.create({
     
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje),
      buttons: ['Cerrar']
    });
    alert.present();
  }

  openDerechos(){
  
  window.open("https://www.yourbeauty.com.pa/terminos/",'_system', 'location=yes');
}


   crearUsuario(dataUsuario) {

    let loading = this.loadingCtrl.create({content : "Registrando"});
  loading.present();




    this.apiProvider.addUserEmail(dataUsuario)
    .then(data => {    

        console.log(data);
      if(data.insertId  > 0){

      loading.dismissAll();
      this.closeModal();
      this.events.publish('loginRemoto', dataUsuario);
      /*
            this.presentAlert2(`<img  src="assets/imgs/confirmarf.png"> <div stye="line-height: 25px;
    font-size: 16px;color: #888;"> Registro completo! Ya puedes empezar a utlizar Yourbeauty</div>`);

    */


      }
      else{
      loading.dismissAll();
      this.presentAlert('Ups!','No se ha podido crear el usuario');
      }

    });

  }




}
