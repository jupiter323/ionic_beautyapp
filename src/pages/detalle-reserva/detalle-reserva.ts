import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import {CalendarModal,CalendarModalOptions,} from 'ion2-calendar';

import {CalendarComponentOptions} from 'ion2-calendar';

import * as moment from 'moment';

/**
 * Generated class for the DetalleReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-reserva',
  templateUrl: 'detalle-reserva.html',
})
export class DetalleReservaPage {


     date: Date = new Date();
  options: CalendarComponentOptions = {
    from: Date.now(),
    defaultDate: this.date,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
            weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
  };
    

  startF=false;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private DomSanitizer: DomSanitizer,public modalCtrl: ModalController,public apiProvider: ApiProvider, public loadingCtrl:LoadingController, public events: Events,  public zone: NgZone) {
   this.horario=[];
  this.dataCentro = {};
  this.diaCerrado = false;
    this.edicionFecha = false;
this.minH = '00:00';
this.maxH='00:00'; 

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad DetalleReservaPage');
    this.getDataCita(this.navParams.get('idCita'));
    if(this.navParams.get('startF')){

    this.startF = true;    
    }
  }

  getEstado(idEstado){

  let estado='';
  if(idEstado == 1){

  estado = "Pendiente confirmar";

  if(this.servicios.filter(item=>{return item.estado==1}).length>0){
    estado = "Confirmado Parcialmente";
  }

  if(this.servicios.filter(item=>{return item.estado==4}).length>0){
    estado = "Declinado";
  }


  }
  else{

  idEstado == 5 ? estado = "Reprogramada" :
  idEstado == 2 ? estado = "Confirmada" :
  idEstado == 3 ? estado = "Completada" :
  idEstado == 4 ? estado = "Declinada" : 
    idEstado == 7 ? estado = "Cancelada" :estado =  "";

  }



  return estado;

  }

 getFechaFormat(eee){


  if(eee){
  
    moment.locale('es');
  return moment(eee, 'YYYY-MM-DD').format('LL');
  }
  else{
  return ' - ';
  }
  
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




getMinH(dia){

var horarioFix = '00:00';


if(this.horario.find(x => x.diaSemana === dia)){
    this.diaCerrado = false;
   horarioFix = this.horario.find(x => x.diaSemana === dia).horaAbrir;
}

return  horarioFix;


}


getMaxH(dia){
var horarioFix = '00:00';
if(this.horario.find(x => x.diaSemana === dia)){
 horarioFix = this.horario.find(x => x.diaSemana === dia).horaCerrar;
}



return  horarioFix;

}

algunaCancelada(){
  
  var algunaC = this.servicios.filter((item)=>{
    return item.estado == 4;
  }).length;

  return algunaC>0;
}



      onChange($event) {


var d = new Date($event);
var n = d.getDay();
console.log(n);

    console.log($event);
   // this.fechaSeleccionada = $event;
    this.horaSeleccionada='';


    if(this.horario.find(x => x.diaSemana === n)){
    console.log(this.horario.find(x => x.diaSemana === n));
        this.maxH =this.getMaxH(n);
        this.minH =this.getMinH(n);
       
    }
    else{
      this.diaCerrado = true;
    }



    
  }
 openCalendar() {
    const options: CalendarModalOptions = {
      title: 'BASIC',
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });
 
    myCalendar.present();
 
    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log(date);
    })
  }


getDattts(str){
if(str){



  return moment(str, 'YYYY-MM-DD HH:mm:ss').format('h:mm a');

}
else{return ' '}

}


  getDataCita(idCita){

   let loading = this.loadingCtrl.create({content : "Cargando...",   cssClass: "my-loading"});
   loading.present();


  		let dataE = {idCita:idCita};
  		console.log(dataE);
        this.apiProvider.getDataCita(dataE)
      .then(data => {
       console.log(data);
              if(data){

                    this.zone.run(()=>{ 



        this.dataCita = data['cita'][0] || [];

        this.horaSeleccionada = this.dataCita.horaInicio;
         this.horaFinalizacion = this.dataCita.horaFinalEsperado;
          this.fechaCalendario = this.dataCita.horaInicio;
        
         this.servicios = data['servicios'] || [];
               this.horario = data['horario'];
               /*
               if(this.dataCita.estado == 3 && window.plugins && window.plugins.NativeAudio){

                  window.plugins.NativeAudio.preloadComplex( 'bepapp', 'assets/bepapp.mp3', 1, 1, 0, (msg)=>{

                  
                  window.plugins.NativeAudio.play('bepapp', () => {

                  setTimeout( () => {

                   window.plugins.NativeAudio.unload('bepapp');

                  }, 2000);
                 


                  });
                  }, (msg)=>{
                  console.log( 'error: ' + msg );
                  });


               console.log('playsonido');
                                }
                                */
 
       }); 

       }
       else{

       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.ionViewDidEnter.bind(this));

       }
       loading.dismiss();
       
      });
  }

  

comoLlegar(){
  console.log(this.dataCentro.latitud);
  launchnavigator.navigate([this.dataCita.latitud, this.dataCita.longitud]);

}



getPrecioDescuento(precio){

  var retorno = 0;


  if(this.dataCita.descuento){

    var descuento = this.dataCita.descuento;
    var precioN = precio;
    retorno = precioN - (precioN*(descuento/100));

  }
  else{
    retorno = precio;
  }




  return retorno;

}

llamar(){

  if(this.dataCita.telefono){
  let num = this.dataCita.telefono;

  window.plugins.CallNumber.callNumber(suc => {console.log(suc)}, err => {console.log(err)}, num, true);


  }


  

}

alertaAcep() {
  let alert = this.alertCtrl.create({
    title: 'Confirmacion exitosa',
    subTitle: 'Tu reserva ha sido confirmada',
    buttons: ['Cerrar']
  });
  alert.present();
}


aceptarReprogramacion(){

  let loading = this.loadingCtrl.create({content : "Cargando ..."});
    loading.present();


        this.apiProvider.aceptarReprogramacion({idCita:this.dataCita.idCita})
      .then(data => {
       console.log(data);
       loading.dismiss();
              if(data.affectedRows>0){
        this.alertaAcep();
        this.getDataCita(this.dataCita.idCita);
         this.edicionFecha=false;
       }
       else{alert('Ha ocurrido un error');}

      
      });


  console.log('aceptarReprogramacion');
  console.log(this.dataCita);

}

alertaRepro() {
  let alert = this.alertCtrl.create({
    title: 'Reprogramacion exitosa',
    subTitle: 'La reservacion fue reprogramada, te notificaremos cuando sea aceptada',
    buttons: ['Cerrar']
  });
  alert.present();
}



guardarReprogramacion(){


  let loading = this.loadingCtrl.create({content : "Cargando ..."});
    loading.present();


  var horaNueva='';
  var finaliza='';

if(isNaN(Date.parse(this.horaSeleccionada))){
  
   horaNueva = this.fechaCalendario+' '+this.horaSeleccionada+':00';
}
else{
  horaNueva = this.horaSeleccionada.split('T')[0] +' '+(this.horaSeleccionada.split('T')[1]).substring(0,7);

}

finaliza = this.horaFinalizacion.split('T')[0] +' '+(this.horaFinalizacion.split('T')[1]).substring(0,7);


  //console.log(this.horaFinalizacion);
 // console.log(this.horaSeleccionada);
  //console.log(this.fechaCalendario);
  

var dataE = {idCita:this.dataCita.idCita,
             horaInicio:horaNueva,
             horaFinalEsperado:finaliza
            };

console.log(dataE);


        this.apiProvider.reprogramarCita(dataE)
      .then(data => {
      loading.dismiss();

       console.log(data);
              if(data.affectedRows>0){
        this.alertaRepro();
        this.getDataCita(this.dataCita.idCita);
         this.edicionFecha=false;
       }
       else{alert('Ha ocurrido un error');}

      
      });



}


reprogramarCita(){


      this.apiProvider.addProductoz(this.servicios)
      .then(data => {
       this.goReserva(this.servicios[0].idCategoria);

      });




}


//idcen idcat
  goReserva(categoria) {
  //servicios: this.arraySelected

  let dataE = {'servicios':[], 'idCita':this.dataCita.idCita,'idCentro':this.dataCita.idCentro, centro:this.dataCentro, 'cupon': this.dataCita.idCuponCliente, idCategoria:categoria, reprogra:true};
  console.log(dataE);
  this.navCtrl.push('ReservaPage', dataE);

    // this.navCtrl.push('ReservaPage');
  }



reprogramarCita2(){
  console.log('reprogramarCita');
  console.log(this.dataCita);

  this.edicionFecha=true;

}



cancelarEdicion(){

 

        this.horaSeleccionada = this.dataCita.horaInicio;
         this.horaFinalizacion = this.dataCita.horaFinalEsperado;
            this.fechaCalendario = this.dataCita.horaInicio;
 this.edicionFecha=false;
}




cancelarCita() {
  let alert = this.alertCtrl.create({
    title: 'Cancelar Reserva',
    message: 'Seguro que deseas cancelar esta reserva?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Si',
        handler: () => {


          let dataE = {idCita:this.dataCita.idCita};
          console.log(dataE);
          this.apiProvider.cancelarCita(dataE)
          .then(data => {
          console.log(data);
          if(data){
          console.log('borrada');
          this.navCtrl.pop();
          }
          else{console.log('Ha ocurrido un error');}


          });


        }
      }
    ]
  });
  alert.present();
}


       getMinutosCita(hora) {

   var duracionMinutos=0;
            this.servicios.forEach((item) => {
       duracionMinutos += item.duracion;
      });
      console.log(duracionMinutos);
      return duracionMinutos;

        }


       formatTime(n) {

     return n > 9 ? "" + n: "0" + n;

        }

//n > 9 ? "" + n: "0" + n;

        actualizarHora(hora) {

        var theAdd = new Date(hora);
        console.log(Date.parse(theAdd));

        if(isNaN(Date.parse(theAdd))){

        if(hora !== ''){
        theAdd = new Date(this.fechaCalendario+'T'+hora+':00Z');
        theAdd.setMinutes(theAdd.getMinutes() + this.getMinutosCita());
        this.horaFinalizacion =new Date(theAdd).toISOString();
        }
        }
        else{
        console.log(theAdd);
        theAdd.setMinutes(theAdd.getMinutes() + this.getMinutosCita());
        this.horaFinalizacion =theAdd.toISOString();

        }
 
        }




}
