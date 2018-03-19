import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CuponesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupones',
  templateUrl: 'cupones.html',
})
export class CuponesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
        this.section="one";
    console.log('ionViewDidLosad CuponesPage');
  }


   filtroCategoria() {
    //console.log('ionViewDidLoad FavoritosPage');
     this.showCheckbox();
  }

  showCheckbox() {
    let alert = this.alertCtrl.create({ cssClass: 'alertCustomCss'});
    alert.setTitle('Filtra por servicio');

    alert.addInput({
      type: 'checkbox',
      label: 'Rostro y Cuerpo',
      value: 'Rostro y Cuerpo',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Peluqueria',
      value: 'Peluqueria'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Uñas',
      value: 'Uñas'
    });



    alert.addInput({
      type: 'checkbox',
      label: 'Masaje',
      value: 'Masaje',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Depilacion',
      value: 'Depilacion'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bienestar',
      value: 'Bienestar'
    });



    alert.addInput({
      type: 'checkbox',
      label: 'Paquetes',
      value: 'Paquetes',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Ofertas',
      value: 'Ofertas'
    });





    alert.addButton('Cancel');
    alert.addButton({
      text: 'Seleccionar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }



}
