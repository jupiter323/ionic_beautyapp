import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {CalendarModal,CalendarModalOptions,} from 'ion2-calendar';

import {CalendarComponentOptions} from 'ion2-calendar';


/**
 * Generated class for the BuscarModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-buscar-modal',
  templateUrl: 'buscar-modal.html',
})
export class BuscarModalPage {



     date: Date = new Date();
  options: CalendarComponentOptions = {
    from: Date.now(),
    defaultDate: this.date,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
  };
  



  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public alertCtrl: AlertController, public viewCtrl : ViewController) {



   this.information = [{nombre:'Disponible en fecha',id:1},
                        {nombre:'Disponible en hora',id:2},
                        {nombre:'Servicio',id:3}];



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarModalPage');
  }




public closeModal(){
 //	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
}



  showCheckbox() {
    let alert = this.alertCtrl.create({ cssClass: 'alertCustomCss'});
    alert.setTitle('Filtra por categoria');

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



      onChange($event) {
    console.log($event);
    this.fechaSeleccionada = $event;
  }

  toggleSection(i) {
  	if(i == 2){
  	this.showCheckbox()
  	}
  	else{
  		  this.information[i].open = !this.information[i].open;
  	}
  
  }
 

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }






}
