import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {CalendarModal,CalendarModalOptions,} from 'ion2-calendar';

import {CalendarComponentOptions} from 'ion2-calendar';



/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})


export class ReservaPage {


     date: Date = new Date();
  options: CalendarComponentOptions = {
    from: Date.now(),
    defaultDate: this.date,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
  };
    


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events) {

  this.loading = this.loadingCtrl.create({
     cssClass: "my-loading"
});


  events.subscribe('modalServices', () => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('recargarServicios');
     this.loading.dismiss();
      this.loading = this.loadingCtrl.create({
     cssClass: "my-loading"
});
  });


 this.information = [{nombre:'Seleccionar Fecha',id:1},
                        {nombre:'Seleccionar Hora',id:2},
                        {nombre:'Seleccionar Personal',id:3}];

                         //this.fechaSeleccionada = new Date(Date.now());



  }

   openServices() {
   let profileModal = this.modalCtrl.create('ModalServicesPage', { serviceId:1 });
   profileModal.present();
 //  this.presentLoadingDefault();
 }


  ionViewDidLoad() {
    console.log('ioiewidLoadeservaPage');
     // this.openCa lendar();
     //new Date( Date.now());
  }


  presentLoadingDefault() {
  

   this.loading.present();



   }


        goAddServicios() {
        
     //this.navCtrl.push('AddserviciosPage');
     this.openServices();
  }



        goReserva() {
      this.navCtrl.push('ConfirmarReservaPage');
     //this.openServices();
  }

    openCalendar() {
    const options: CalendarModalOptions = {
      title: 'BASIC',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });



    myCalendar.present();

    myCalendar.onDidDismiss((date:CalendarResult, type: string) => {
      console.log(date);
    })
    }

      onChange($event) {
    console.log($event);
    this.fechaSeleccionada = $event;
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }


}
