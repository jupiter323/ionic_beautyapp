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




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  seleccionado = false;
  authForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public events: Events, public alertCtrl: AlertController, public viewCtrl: ViewController, public apiProvider: ApiProvider, private sanitizer: DomSanitizer) {




    this.authForm = formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7}$|^\d{8}$/)]],
      email: ['', Validators.compose([Validators.required]), this.checkUsername2.bind(this)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkUsername2(control: FormControl): any {
    console.log(control.value);


    return new Promise(resolve => {

      this.apiProvider.verificarEmail2({ email: control.value })
        .then((data: any) => {

          if (data.length > 0) {
            this.seleccionado = true;
            resolve({
              "username taken": true
            });

          }
          else {
            this.seleccionado = false;
            resolve(null);
          }


        }, err => {
          console.log(err);
          console.log('someError');

        });

    });

  }




  public closeModal() {
    //	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
  }

  presentAlert(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Cerrar']
    });
    alert.present();
  }


  openDerechos() {

    window.open("https://www.yourbeauty.com.pa/terminos/", '_system', 'location=yes');
  }


  presentAlert2(mensaje) {
    let alert = this.alertCtrl.create({

      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje),
      buttons: ['Cerrar']
    });
    alert.present();
  }
  crearUsuario(data) {

    this.closeModal();
    // let profileModal2 = this.modalCtrl.create('VerificacionPage');
    // profileModal2.present();




    let loading = this.loadingCtrl.create({ content: "Registrando" });
    loading.present();




    this.apiProvider.addUserEmail(data)
      .then(data => {

        console.log(data);
        if (data.insertId > 0) {

          loading.dismissAll();
          this.closeModal();

          this.navCtrl.push('VerificacionPage', { idCliente: data.insertId });

          /*
             this.presentAlert2(`<img  src="assets/imgs/confirmarf.png"> <div stye="line-height: 25px;
     font-size: 16px;color: #888;"> Registro completo! Ya puedes empezar a utlizar Yourbeauty</div>`);
         */


        }
        else {
          loading.dismissAll();
          this.presentAlert('Ups!', 'No se ha podido crear el usuario');
        }

      });

  }




}
