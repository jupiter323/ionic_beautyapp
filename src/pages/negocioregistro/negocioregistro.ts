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
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * Generated class for the NegocioregistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-negocioregistro',
  templateUrl: 'negocioregistro.html',
})
export class NegocioregistroPage {

  authForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public formBuilder: FormBuilder, public loadingCtrl: LoadingController,public events: Events, private sanitizer: DomSanitizer, public alertCtrl: AlertController, public viewCtrl : ViewController,public apiProvider: ApiProvider) {



        
        this.authForm = formBuilder.group({
            nombre: ['', Validators.compose([Validators.required])],
               nombre2: ['', Validators.compose([Validators.required])],
            telefono: [''],
              comentario: [''],
            email: ['', Validators.compose([Validators.required])]
        });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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



   crearUsuario(data) {
//

    let loading = this.loadingCtrl.create({content : "Registrando solicitud"});
  loading.present();




    this.apiProvider.addNegocio(data)
    .then(data => {    

        console.log(data);
      if(data.insertId  > 0){

      loading.dismissAll();
      this.closeModal();
      this.presentAlert2(`<img  src="assets/imgs/confirmarf.png"> <div stye="line-height: 25px;
    font-size: 16px;color: #888;"> Estas a un paso de formar parte de YOURBEAUTY. Te contactaremos a la brevedad posible</div>`);

      }
      else{
      loading.dismissAll();
      this.presentAlert('Ups!','No se ha podido completar tu solicitud');
      }

    });

  }




}
