import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {CalendarModal,CalendarModalOptions,} from 'ion2-calendar';
import { Select } from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
import { ViewChild } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core'; 
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the ReservapaquetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservapaquete',
  templateUrl: 'reservapaquete.html',
})
export class ReservapaquetePage {



 @ViewChild('selectH') selectH: Select;

empleados=[];
horasDisponibles=[];
diaLibre = false;


 staffSeleccionado=0;
     date: Date = new Date();

    


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider,public cdr: ChangeDetectorRef,public zone: NgZone) {

this.tipoReserva =2;
this.diasCerrado=[];
this.reprogra=false;
  this.options = {
    from: Date.now(),
    defaultDate: this.date,
     disableWeeks: this.diasCerrado,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
        weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    daysConfig:[{
        date: new Date(2018, 7, 25),
         disable:true,
          subTitle: 'Sin espacio'
      }],
  };


this.selectOptions = {
  title: 'Horarios disponibles',
  cssClass:'select-alertless'
};

   this.arraySelected=[];
  this.diaCerrado = false;

this.minH = '00:00';
this.maxH='00:00'; 
this.serviciosCarro=[];
   this.serviciosAll=[];
   this.horario=[];
   this.horarioEspecial=[];

  this.loading = this.loadingCtrl.create({
     cssClass: "my-loading"
});




 this.information = [{nombre:'Seleccionar Fecha',id:1, open:true},
                        {nombre:'Seleccionar Hora',id:2}];

                         //this.fechaSeleccionada = new Date(Date.now());



  }

   openServices() {

       var dataE={idCategoria:this.navParams.get('idCategoria'),
                idCentro:this.navParams.get('idCentro')};

   let profileModal = this.modalCtrl.create('ModalServicesPage', dataE);
   profileModal.present();
 //  this.presentLoadingDefault();
 }



  ionViewDidLoad() {
 // this.selectActi = this.navParams.get('servicios');
 //this.selectActi = this.navParams.get('servicios');

/*
      this.apiProvider.getCarrito()
      .then(data => {
      console.log(data);
          this.serviciosCarro = data;
          console.log(this.serviciosCarro);

      });
*/
		this.serviciosCarro = this.navParams.get('servicios');

      //if(this.navParams.get('reprogra')==true){this.reprogra=true;}
      this.getCentroInfo(this.navParams.get('idCentro'));

  }





  presentLoadingDefault() {
   this.loading.present();
  }

getDattts(str){
if(str){


  return moment(str, 'YYYY-MM-DD HH:mm:ss').format('h:mm a');

}
else{return ' '}

}

    getServiciosCategoria(){
    var dataE={idCategoria:this.navParams.get('idCategoria'),
                idCentro:this.navParams.get('idCentro')};

          this.apiProvider.getServiciosCategoria(dataE).then(data => {

          console.log(data);

          });
    }

    getEmpleadosDisponibles(data){


          this.apiProvider.getEmpleadosDisponibles(data).then(data => {
          console.log(data);
          if(data){
          this.empleados = data;
          }


          });
    }

getDattt(str){
if(str){
    var gg = str+'.000';
  return gg.replace(/\s/g, "T");

}
else{return ' '}

}

     getCentroInfo(idCentro){
   let dataPost = {idCentro:idCentro};
   console.log(dataPost);
   this.apiProvider.getCentroServicios2(dataPost)
      .then(data => {
    

        if(data){
          this.serviciosAll = data['servicios'];
          // this.tipoReserva = data['tipoReserva'][0].tipoReserva;
         //  this.empleados = data['empleados'];
           this.horario = data['horario'];
console.log( this.tipoReserva);

var sources2 = data['horarioEspecial'].filter((dia)=>{return dia.abierto==0}).map((item)=>{

  var base = (item.fecha.split('T')[0].split('-'));
  var ano = parseInt(base[0]);
    var mes = parseInt(base[1])-1;
      var dia = parseInt(base[2]);


  return {
        date: new Date(ano, mes, dia),
         disable:true
      };
});
console.log(sources2);
var sources = [0,1,2,3,4,5,6].filter((dia)=>{

   if(this.horario.some( horarioDia => horarioDia.diaSemana == dia)){

   if(this.horario.some( horarioDia => ((horarioDia.diaSemana == dia) && (horarioDia.estado == 1)))){
    return false;
   }
   else{
   return true;
   }
   }
   else{ return true;}
});



  this.options = {
    from: Date.now(),
    defaultDate: this.date,
     disableWeeks: sources,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
        weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    daysConfig:sources2,
  };
    
    this.horarioEspecial = data['horarioEspecial'];


       }
       else{console.log('Ha ocurrido un error');}

       console.log(data);
       
      });


  }

getMinH(dia){

var horarioFix = '00:00';


if(this.horario.find(x => x.diaSemana == dia)){
    this.diaCerrado = false;
   horarioFix = this.horario.find(x => x.diaSemana == dia).horaAbrir;
}

return  horarioFix;


}


getMaxH(dia){
var horarioFix = '00:00';
if(this.horario.find(x => x.diaSemana == dia)){
 horarioFix = this.horario.find(x => x.diaSemana == dia).horaCerrar;
}



return  horarioFix;

}


quitarItem(idServicio){
   
if(this.serviciosCarro.length<2){
  return true;
}
else{
      this.apiProvider.sacarProducto(idServicio)
      .then(data => {

      this.serviciosCarro = data;
      if(this.fechaSeleccionada){
      this.onChange(this.fechaSeleccionada);
      }
    //  if(this.horaSeleccionada){
     // console.log('3de3d3');


      //this.actualizarHora(this.horaSeleccionada);


     // }
      
         // console.log(data);
      });


}

}


const filterFav = (user: any) => { return this.selectActi.indexOf(user.idServicio) != -1; };


        goAddServicios() {
        
     //this.navCtrl.push('AddserviciosPage');
     //this.openServices();
       this.navCtrl.pop();
  }



       getMinutosCita(hora) {

   var duracionMinutos=0;
            this.serviciosCarro.forEach((item) => {
       duracionMinutos += item.duracion;
      });

      return duracionMinutos;

        }


       formatTime(n) {

     return n > 9 ? "" + n: "0" + n;

        }

//n > 9 ? "" + n: "0" + n;

        actualizarHora(hora) {
        console.log(hora);
        this.staffSeleccionado=-1;
        this.empleados=[];
        var theAdd = new Date();
        theAdd.setHours(hora.split(':')[0], hora.split(':')[1], 0, 0);
        theAdd.setMinutes(theAdd.getMinutes() + this.serviciosCarro[0].duracionPaquete);
        this.horaFinalizacion = this.formatTime(theAdd.getHours()) + ":" + this.formatTime(theAdd.getMinutes()) + ':00';
      

    //cerrar cuando se selecciona
    this.information[1].open=true;



        }


        goReserva3(fechaSeleccionada,horaSeleccionada) {
        
      //console.log((this.serviciosAll));
 var fechaInicio = fechaSeleccionada +' '+ horaSeleccionada + ':00';
 var fechaFinal = fechaSeleccionada +' '+ this.horaFinalizacion ;

  let dataE = {'fechaInicio':fechaInicio,'fechaFinal':fechaFinal, 'fecha':fechaSeleccionada, 'hora':horaSeleccionada, 'horaF':this.horaFinalizacion,'idCita':this.navParams.get('idCita'), 'idEmpleado':this.staffSeleccionado || 0, 'nombreStaff': this.nombreStaff || ''};


        let loading = this.loadingCtrl.create({content : "Reprogramando Cita..."});
  loading.present();

     this.apiProvider.reproCitaApp(dataE)
      .then(data => {
    

        if(data){
        console.log(data);
        if(data.affectedRows>0){

          this.navCtrl.pop();

        }
       }
       else{console.log('Ha ocurrido un error');}

         loading.dismissAll(); 

       
      });


  }

        goReserva(fechaSeleccionada,horaSeleccionada) {
        
      //console.log((this.serviciosAll));
 var fechaInicio = fechaSeleccionada +' '+ horaSeleccionada + ':00';
 var fechaFinal = fechaSeleccionada +' '+ this.horaFinalizacion ;

  let dataE = {'idCuponCliente':null,'fechaInicio':fechaInicio,'fechaFinal':fechaFinal, 'fecha':fechaSeleccionada, 'hora':horaSeleccionada, 
  'idCentro': this.navParams.get('idCentro'), 'horaF':this.horaFinalizacion,'servicios':this.serviciosCarro, 'idEmpleado':this.staffSeleccionado || 0, 'nombreStaff': this.nombreStaff || ''};
  this.navCtrl.push('ConfirmacionpaquetePage', dataE);
  }

    openCalendar() {

        let _daysConfig: DayConfig[] = [];
  //  for (let i = 0; i < 31; i++) {
      _daysConfig.push({
        date: new Date(2018, 8, 25),
         disable:true
      });
   // }


    const options: CalendarModalOptions = {
      title: 'BASIC',
      daysConfig: _daysConfig
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

      
   this.loading = this.loadingCtrl.create({content : "Verificando Disponibilidad"});
   this.loading.present();


            this.diaLibre = false;
this.diaCerrado = false;
var encontrado = false;
    this.information[1].open=false;


        var t1='00:00';
        var t2='00:00';
        var cerrado = false;
var d = new Date($event);
var n = d.getDay();
console.log(n);
  if(n==6){n=0;}
  else{n=n+1;}

this.diaNSeleccionado  = n;

    console.log($event);

    this.fechaSeleccionada = $event;
console.log(this.horarioEspecial);



    console.log(this.fechaSeleccionada);
    console.log(this.horario);

    if(this.tipoReserva==1 || this.tipoReserva=='1'){
    this.horaSeleccionada='';
    }
    


    if(this.horario.find(x => (x.diaSemana == n && x.estado=='1'))){

        if(this.horarioEspecial && this.horarioEspecial.length>0){
        this.horarioEspecial.forEach((item) => {
        if(item.fecha.split('T')[0]==this.fechaSeleccionada){

        encontrado = true;
         t2=item.horaAbrir;
         t1=item.horaCerrar;
         cerrado = item.abierto;
        }
        });

        if(encontrado){
          if(cerrado==1 || cerrado=='1'){
          this.maxH =t1;
          this.minH =t2;
          }
          else{
          this.diaCerrado = true;
          }

        }else{
          this.maxH =this.getMaxH(n);
          this.minH =this.getMinH(n);
        }

        }
        else{
          this.maxH =this.getMaxH(n);
          this.minH =this.getMinH(n);
        }
    }
    else{
      this.diaCerrado = true;
    }

    if(this.tipoReserva==2 || this.tipoReserva=='2'){
console.log(this.minH,this.maxH);
     this.loading.dismiss();
       this.information[0].open=false;
       this.information[1].open=true;

    }
    else{ 

    var env = {fechaSeleccionada:this.fechaSeleccionada,
                duracion:this.getMinutosCita(),
                horaAbrir:this.minH,
                 horaCerrar:this.maxH,
                 idCategoria:this.navParams.get('idCategoria'),
                 idCentro:this.navParams.get('idCentro')
                 };
                 console.log(env);
    this.getHorasDispo(env);
    }

    
  }


printOption = (ee) => {
console.log(ee);
this.horaSeleccionada = ee;
this.actualizarHora(ee);
/*
  console.log(ee);
  if(ee.length<1){
  return true;
  }
  else{
    var fs = {'nombre':this.seleccionCategoria,'sub':ee};
  console.log(fs);
  this.navCtrl.push('ListaServiciosPage', fs);
  }
*/
}

    abrirSelect=()=>{
              this.cdr.detectChanges();
              this.selectH.open();
    }
    getHorasDispo=(data)=>{
          this.apiProvider.getHorasDispo(data).then(data => {
          console.log(data);

           this.loading.dismissAll();

          if(data){
          if(data.horasDispo.length>0){ 


          this.zone.run(() => {

             this.horasDisponibles=data.horasDispo.filter(word => word[0].disponibles > 0);

          if(this.horasDisponibles.length>0){

          this.information[0].open=false;
    
          this.abrirSelect();

          }
          else{
           this.presentAlert();
          }

          });
       



          }
          else{
           this.presentAlert();
          }

          //if(data.horariosDispo == 0){
          //this.diaLibre = true;
          //}
          //if(data.disponible == 1){
          //this.diaLibre = true;
          //}
         
          }
             else{
           this.presentAlert();
          }

          });
    }

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Ocupacion llena',
    subTitle: 'No hay empleados elegibles, intenta otra fecha',
    buttons: ['Cerrar']
  });
  alert.present();
}


  toggleSection(i) {
 if(i==1){


    if(this.tipoReserva==2 || this.tipoReserva=='2'){
      this.information[i].open = !this.information[i].open;
    }
    else{
    if(this.horasDisponibles.length>0){
     this.abrirSelect();
    }
    else{
    this.presentAlert();
    }
    }

  }
  else{
    this.information[i].open = !this.information[i].open;
 }
  
  }
 

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

    radioChecked(checkE) {
    this.nombreStaff = checkE;
    console.log(checkE);
  }


}
