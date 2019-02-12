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

import { DomSanitizer } from '@angular/platform-browser';

import { ChangeDetectorRef } from '@angular/core'; 
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

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

 @ViewChild('selectH') selectH: Select;
 @ViewChild('selectH2') selectH2: Select;

totalPrefor2:any;
idCliente:any;
indexItemS:any;
empleados=[];
horasDisponibles=[];
staffDisponibles=[];
diaLibre = false;
loadingCargando = false;

 staffSeleccionado=0;
     date: Date = new Date();

    


  constructor(public navCtrl: NavController, private DomSanitizer: DomSanitizer, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider,public cdr: ChangeDetectorRef,public zone: NgZone) {

this.tipoReserva =1;
this.diasCerrado=[];
this.reprogra=false;
this.paquete=false;
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


this.selectOptions2 = {
  title: 'Staff disponible',
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
                       // {nombre:'Seleccionar Hora',id:2},
                        {nombre:'Seleccionar Personal',id:3}];

                         //this.fechaSeleccionada = new Date(Date.now());



  }

   openServices() {

       var dataE={idCategoria:this.navParams.get('idCategoria'),
                idCentro:this.navParams.get('idCentro')};

   let profileModal = this.modalCtrl.create('ModalServicesPage', dataE);
   profileModal.present();
 //  this.presentLoadingDefault();
 }



 getFechaFormat(){


  if(this.fechaSeleccionada){
  
    moment.locale('es');
  return moment(this.fechaSeleccionada, 'YYYY-MM-DD').format('LL');
  }
  else{
  return 'Seleccionar Fecha';
  }
  
}



calcularEspera(inicio,fin){
  var a = moment(inicio, 'HH:mm:ss');
var b = moment(fin, 'HH:mm:ss');
var diferencia = (a.diff(b, 'minutes'));

 var hora =   Math.floor(diferencia/60);
 var min = diferencia % 60;

 return ''+hora+'h '+min+'min'
}

ionViewDidEnter(){


    this.events.subscribe('actualizarDataServicios', () => {
      this.apiProvider.getCarrito()
      .then(data => {
      console.log(data);
          this.serviciosCarro = data;
          console.log(this.serviciosCarro);
          //if(this.horaSeleccionada){this.actualizarHora(this.horaSeleccionada);}
              if(this.fechaSeleccionada){
              this.onChange(this.fechaSeleccionada);
              }
          this.totalPrefor();

      });
  });


  this.events.subscribe('modalServices', () => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('recargarServicios');
     this.loading.dismiss();
      this.loading = this.loadingCtrl.create({
     cssClass: "my-loading"
});
  });

/*
            this.apiProvider.verificarLogin()
            .then(data => { 
              console.log(data);
              if(data){
              this.idCliente = data.idCliente;
              console.log(this.idCliente);   
              }
              else{
              this.idCliente = 0;
              } 
        });
*/

this.totalPrefor();
}

ionViewDidLeave(){
  this.events.unsubscribe('modalServices');
  this.events.unsubscribe('actualizarDataServicios');
  console.log('leave unsusc');
}


  ionViewDidLoad() {
 // this.selectActi = this.navParams.get('servicios');
 //this.selectActi = this.navParams.get('servicios');


      this.apiProvider.getCarrito()
      .then(data => {
      console.log(data);
          this.serviciosCarro = data;
         // console.log(this.serviciosCarro);

      });


      if(this.navParams.get('reprogra')==true){this.reprogra=true;}

      if(this.navParams.get('paquete')==true){
      this.paquete=true;
      this.costoPaquete = this.navParams.get('costoPaquete');
      }


      this.getCentroInfo(this.navParams.get('idCentro'));

  }





  presentLoadingDefault() {
   this.loading.present();
  }
getDattts2(str){
if(str){


  return moment(str, 'HH:mm:ss').format('h:mm a');

}
else{return ' '}

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
   //console.log(dataPost);
   this.apiProvider.getCentroServicios2(dataPost)
      .then(data => {
    

        if(data){
          this.serviciosAll = data['servicios'];
           this.tipoReserva = data['tipoReserva'][0].tipoReserva;
         //  this.empleados = data['empleados'];
           this.horario = data['horario'];
console.log( this.tipoReserva);
/*
var sources2 = [{
        date: new Date(2018, 7, 25),
         disable:true,
          subTitle: 'Sin espacio'
      }];
*/

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
    to:new Date(data['fechaTo']),
    defaultDate: this.date,
     disableWeeks: sources,
    weekdays: ['D', 'L', 'M', 'K', 'J', 'V', 'S'],
        weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    daysConfig:sources2,
  };
    
    this.horarioEspecial = data['horarioEspecial'];


       }
       else{
            console.log('Ha ocurrido un error');
            this.reintentarAlert(this.ionViewDidLoad.bind(this));
            }

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
         this.totalPrefor();
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
        this.staffSeleccionado=0;
        this.empleados=[];
        var theAdd = new Date();
        theAdd.setHours(hora.split(':')[0], hora.split(':')[1], 0, 0);
        theAdd.setMinutes(theAdd.getMinutes() + this.getMinutosCita());
        this.horaFinalizacion = this.formatTime(theAdd.getHours()) + ":" + this.formatTime(theAdd.getMinutes()) + ':00';
       
          

          var dataEmpleados={idCategoria:this.navParams.get('idCategoria'),
                             idCentro:this.navParams.get('idCentro'),
                             fecha:(this.fechaSeleccionada+' '+hora+':00'),
                             fechaF:(this.fechaSeleccionada+' '+this.horaFinalizacion),
                             diaN:this.diaNSeleccionado,
                             soloHI:hora+ ':00',
                             soloHF:this.horaFinalizacion};

             console.log(dataEmpleados);
            this.getEmpleadosDisponibles(dataEmpleados);

    //cerrar cuando se selecciona
    this.information[1].open=true;
    this.information[2].open=true;  


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


        reprogramarCita() {
        console.log(this.serviciosCarro);
          let loading = this.loadingCtrl.create({content : "Reprogramando..."});
  loading.present();

 if(this.serviciosCarro.length>1){
   var fechaInicio = this.fechaSeleccionada +' '+ this.serviciosCarro[0].inicio;
   var fechaFinal = this.fechaSeleccionada +' '+ this.serviciosCarro[this.serviciosCarro.length-1].fin;
 }
 else{
  var fechaInicio = this.fechaSeleccionada +' '+ this.serviciosCarro[0].inicio;
   var fechaFinal = this.fechaSeleccionada +' '+ this.serviciosCarro[0].fin;
 }

 var dataEv= {  'fecha':this.fechaSeleccionada,
                'servicios':this.serviciosCarro,
              'inicio':fechaInicio,
             'fin':fechaFinal};

    this.apiProvider.reprogramarCitaNC(dataEv)
      .then(data => {
      console.log(data);
      loading.dismiss();
      this.navCtrl.pop();
      });
  }


/*  
 var fechaInicio = this.fechaSeleccionada +' '+ horaSeleccionada + ':00';
 var fechaFinal = fechaSeleccionada +' '+ this.horaFinalizacion ;

  let dataE = {'idCuponCliente':this.navParams.get('cupon'),'fechaInicio':fechaInicio,'fechaFinal':fechaFinal, 'fecha':fechaSeleccionada, 'hora':horaSeleccionada, 'horaF':this.horaFinalizacion,'centro':this.navParams.get('centro'), 'idEmpleado':this.staffSeleccionado || 0, 'nombreStaff': this.nombreStaff || ''};
  this.navCtrl.push('ConfirmarReservaPage', dataE);

  */


        goReserva() {
        console.log(this.serviciosCarro);
   
 if(this.serviciosCarro.length>1){
   var fechaInicio = this.fechaSeleccionada +' '+ this.serviciosCarro[0].inicio;
   var fechaFinal = this.fechaSeleccionada +' '+ this.serviciosCarro[this.serviciosCarro.length-1].fin;
 }
 else{
  var fechaInicio = this.fechaSeleccionada +' '+ this.serviciosCarro[0].inicio;
   var fechaFinal = this.fechaSeleccionada +' '+ this.serviciosCarro[0].fin;
 }

if(this.paquete){
  
    let dataE={
  'idCuponCliente':null,
  'fechaInicio':fechaInicio,
  'fechaFinal':fechaFinal, 
  'fecha':this.fechaSeleccionada,
  'idPaquete': this.navParams.get('idPaquete'),
  'idCentro':this.navParams.get('idCentro'), 
  'servicios':this.serviciosCarro,
  'total':this.navParams.get('costoPaquete')
  };

   this.confirmacionLista(dataE);

}
else{
  
    let dataE={
  'idCuponCliente':this.navParams.get('cupon'),
  'fechaInicio':fechaInicio,
  'fechaFinal':fechaFinal, 
  'fecha':this.fechaSeleccionada, 
  'idCentro':this.navParams.get('centro').idCentro, 
  'servicios':this.serviciosCarro
  };

    this.apiProvider.getTotal()
      .then(data => {
      console.log(data);
      dataE.total=data;
      this.confirmacionLista(dataE); 
      });

}



  }




confirmacionLista(dataE){ 

    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(dataE);

      if(data){

        let loading = this.loadingCtrl.create({content : "Reservando Cita..."});
  loading.present();
    dataE.idCliente = data.idCliente;
    
    console.log(dataE);
   
     this.apiProvider.addCita(dataE)
      .then(data => {
    

        if(data){
        console.log(data);
        if(data.insertId>0){

          this.navCtrl.setRoot('ReservaHechaPage',{'idCita':data.insertId, 'confirmada':data.confirmada});

        }
       }
       else{

       console.log('Ha ocurrido un error');
        this.reintentarAlert(this.goReserva.bind(this));
       
       }

         loading.dismiss(); 

       
      });
   

      }
      else{

   
   let profileModal = this.modalCtrl.create('LogindPage',{'total':dataE.total});
   profileModal.present();



       //this.menuCtrl.open();
      } 

     

     });


 };





totalPrefor(){
  
      this.apiProvider.getTotal()
      .then(data => {
      console.log(data);
      this.totalPrefor2 = data;

      });


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
   this.loadingCargando = true;

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
    //CAMBIOS EN RESERVA
   // if(this.tipoReserva==2 || this.tipoReserva=='2'){
   if(false){
console.log(this.minH,this.maxH);
  if(this.horaSeleccionada){this.actualizarHora(this.horaSeleccionada);}
     this.loading.dismiss();
       this.information[0].open=false;
       this.information[1].open=true;

    }
    else{ 
/*
    var env = {fechaSeleccionada:this.fechaSeleccionada,
                duracion:this.getMinutosCita(),
                horaAbrir:this.minH,
                 horaCerrar:this.maxH,
                 idCategoria:this.navParams.get('idCategoria'),
                 idCentro:this.navParams.get('idCentro')
                 };
                 console.log(env);
                 */
//this.getHorasDispo(env);
this.information[0].open=false;
this.procesarData();

    }

    
  }


 delayedLog(item){

return new Promise((resolve, reject) => {
      this.apiProvider.getHorasDispo(item).then(data => {
          console.log(data);
          if(data){resolve(data);}
          else{
          this.reintentarAlert(this.ionViewDidLoad.bind(this));
          }
          
          });
});
     
}


  reintentarAlert(funcionEnviar){
this.loading.dismiss();
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

    delayedLog2(item){
      return new Promise((resolve, reject) => {
        this.apiProvider.getEmpleadosDisponibles(item).then(data => {
        console.log(data);
        resolve(data);
        });
      });     
    }

    delayedLog3(){
      return new Promise((resolve, reject) => {


          this.apiProvider.getCarrito()
          .then(data => {
          resolve(data);
          });

      });     
    }




async  procesarData(){

var darr = {};
var indexx = 0;
   this.serviciosCarro = await this.delayedLog3();
  for(const  item of this.serviciosCarro){

    darr = {
    duracion: item.duracion,
    fechaSeleccionada: this.fechaSeleccionada,
    horaAbrir: (value && value.length>0) ? value[0].fin.split(' ')[1] : this.minH,
    horaCerrar: this.maxH,
    idServicio: item.idServicio,
    idCentro: this.navParams.get('idCentro')

    };

    console.log(darr);
    let value = await this.delayedLog(darr);

    if(value.length>0){
    if(indexx==0){this.horasDisponibles = value;}
    item.inicio = value[0].inicio.split(' ')[1];
    item.fin = value[0].fin.split(' ')[1];
                  
    var dataEmpleados={idServicio:item.idServicio,
                       idCentro:this.navParams.get('idCentro'),
                       fecha:(this.fechaSeleccionada+' '+item.inicio),
                       fechaF:(this.fechaSeleccionada+' '+item.fin),
                       diaN:this.diaNSeleccionado,
                       soloHI:item.inicio,
                       soloHF:item.fin};
    let valueE = await this.delayedLog2(dataEmpleados);
    item.empleados = valueE;
    if(item.empleados.length>0){
    item.empleadoSeleccionado = item.empleados[0];
    }
    console.log(value);
    console.log(valueE);
    }
   
    indexx += 1;
  }
  this.loadingCargando = false;
  this.loading.dismiss();

}




async  procesarData2(minH){

var darr = {};

   this.serviciosCarro = await this.delayedLog3();
  for(const  item of this.serviciosCarro){

    darr = {
    duracion: item.duracion,
    fechaSeleccionada: this.fechaSeleccionada,
    horaAbrir: (value && value.length>0) ? value[0].fin.split(' ')[1] : minH,
    horaCerrar: this.maxH,
    idServicio: item.idServicio,
    idCentro: this.navParams.get('idCentro')

    };

    console.log(darr);
    let value = await this.delayedLog(darr);

    if(value.length>0){

    item.inicio = value[0].inicio.split(' ')[1];
    item.fin = value[0].fin.split(' ')[1];
                  
    var dataEmpleados={idServicio:item.idServicio,
                       idCentro:this.navParams.get('idCentro'),
                       fecha:(this.fechaSeleccionada+' '+item.inicio),
                       fechaF:(this.fechaSeleccionada+' '+item.fin),
                       diaN:this.diaNSeleccionado,
                       soloHI:item.inicio,
                       soloHF:item.fin};
    let valueE = await this.delayedLog2(dataEmpleados);
    item.empleados = valueE;
    if(item.empleados.length>0){
    item.empleadoSeleccionado = item.empleados[0];
    }
    console.log(value);
    console.log(valueE);
    }
   

  }
  this.loadingCargando = false;
  this.loading.dismiss();

}


seleccionarEmpleados(empleados,indexA){

console.log(indexA);
this.indexItemS = indexA;
this.staffDisponibles = empleados;
      this.cdr.detectChanges();
      console.log(this.staffDisponibles);
              this.selectH2.open();
}



sinEmpleado(){
  var sinEmpleado = false;
  this.serviciosCarro.forEach(item=>{
    if(!item.empleadoSeleccionado){
      sinEmpleado = true;
    }
  });
  return sinEmpleado;
}


printOption2 = (ee) => {
  
  console.log(ee);
  this.serviciosCarro[this.indexItemS].empleadoSeleccionado = this.serviciosCarro[this.indexItemS].empleados[ee];
   this.cdr.detectChanges();
}


printOption = (ee) => {
console.log(ee);
//this.horaSeleccionada = ee;
//this.actualizarHora(ee);

  
   this.loading = this.loadingCtrl.create({content : "Verificando Disponibilidad"});
   this.loading.present();
   this.loadingCargando = true;

this.procesarData2(ee);
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

        abrirSelect2=()=>{
              this.cdr.detectChanges();
              this.selectH2.open();
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
