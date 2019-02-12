import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {CalendarModal,CalendarModalOptions,} from 'ion2-calendar';
import { ApiProvider } from '../../providers/api/api';
import {CalendarComponentOptions} from 'ion2-calendar';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage } from '@ionic/storage';
import * as moment from 'moment';

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
            weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
  };
  
horaMin=0;

horaMax=0;

     todasCat =  [];
   todasSubCat = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public alertCtrl: AlertController, private DomSanitizer: DomSanitizer, public storage: Storage, public apiProvider: ApiProvider, public viewCtrl : ViewController, private zone: NgZone) {

this.seleccionIn = true;
this.geocoder = new google.maps.Geocoder;
this.filtroSeleccion = {};
   this.information = [{nombre:'Disponible en ',id:1},
                        {nombre:'Disponible en hora',id:2},
                        {nombre:'Servicio',id:3}];

//plugin.google.maps

this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
this.autocomplete = { input: '' };
this.autocompleteItems = [];
this.testCheckboxResult= [];
this.resultadosCentro = [];



  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarModalPage');

          this.apiProvider.horaMinMax()
      .then(data => {
       console.log(data);

       if(data){
        this.horaMin = data[0]['minHora'] || 0;
        this.horaMax = data[0]['maxHora'] || 0;
       }
      
       
      });



      this.apiProvider.categoriasHome()
      .then(data => {
       console.log(data);
       if(data){
        this.todasCat = data['categorias'] || [];
        this.todasSubCat = data['subcategorias'] || {};

        var dad = data['categorias'].find((elem)=>{return elem.idCategoria == this.navParams.get('idCat')});
        console.log(dad);
              console.log(this.navParams.get('idCat'));


      if(this.navParams.get('lat') !== 0 && !!this.navParams.get('lat'))
      { this.filtroSeleccion.lat = this.navParams.get('lat');} 

      if(this.navParams.get('lon') !== 0 && !!this.navParams.get('lon'))
      { this.filtroSeleccion.long = this.navParams.get('lon');}

      if(this.navParams.get('stringPlace') !== ' ' && !!this.navParams.get('lon'))
      { this.filtroSeleccion.stringPlace = this.navParams.get('stringPlace');
      }        
     

        this.nombreCat = dad['nombre'];
        this.testCheckboxResult.push(this.navParams.get('idCat'));

        //console.log(this.nombreCat);
        this.information[2].nombre=this.nombreCat;
       }
       else{console.log('Ha ocurrido un error');}
       
      });




  }

closeKB(){
  
  if(Keyboard){
  Keyboard.hide();
  }

}



ionViewDidEnter(){

}


getFechaFormat(){

  if(this.fechaSeleccionada){
    moment.locale('es');
  return moment(this.fechaSeleccionada, 'YYYY-MM-DD').format('LL');
  }
  else{
  return 'fecha';
  }
  
}

updateSearchResults(){
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,
  componentRestrictions:{ country: "pa" } },
  (predictions, status) => {
    this.autocompleteItems = [];

this.autocompleteItems = predictions;
/*
    this.zone.run(() => {
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
        console.log(prediction);
      });
    });
*/


  });
}


selectedAddress(va){
console.log('dd');

if(va==1){
  
  if(this.filtroSeleccion.abierto==true){
  this.filtroSeleccion.disponible = false;
  }

}
if(va==2){
  if(this.filtroSeleccion.disponible==true){
  this.filtroSeleccion.abierto = false;
  }

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



selectSearchResult(item){
  //this.clearMarkers();
  this.autocomplete.input = item.description;

  this.seleccionIn = false;
  this.autocompleteItems = [];

  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
      };
//results[0].geometry.location.toJSON()
      /*
      let marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map,
      });
      */
      console.log(results[0].geometry.location.toJSON());
      this.filtroSeleccion.lat = results[0].geometry.location.toJSON().lat;
      this.filtroSeleccion.long = results[0].geometry.location.toJSON().lng;
      this.filtroSeleccion.stringPlace = this.autocomplete.input;
      //this.markers.push(marker);
      //this.map.setCenter(results[0].geometry.location);
    }
  })
}




public verificarL(){
  let re = (Object.keys(this.filtroSeleccion).length) > 0;
  console.log(re);
  return !re;
}
public closeModal(){
 //	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'GPS desactivado',
    subTitle: 'Debes activar el GPS para obtener los resultados',
    buttons: ['Cerrar']
  });
  alert.present();
}


    doRefresh = ()=>{

                this.storage.get('coorLBY').then((value) => {

        if(value){
          this.filtroSeleccion.lat= value.lat;
          this.filtroSeleccion.long= value.lng;
        }

        else{

   let loading = this.loadingCtrl.create({content : "Obteniendo ubicacion",enableBackdropDismiss: true});
    loading.present();

        navigator.geolocation.getCurrentPosition((pos) => {


         this.filtroSeleccion.lat = pos.coords.latitude;
         this.filtroSeleccion.long = pos.coords.longitude;

          var fechaExpiracion = new Date();
          fechaExpiracion.setHours(fechaExpiracion.getHours() + 1);

          this.storage.set('coorLBY', {'lat':pos.coords.latitude,
                                  'lng':pos.coords.longitude,
                                    'expirationDate': fechaExpiracion});
                      
          loading.dismiss();
        }, function(error) {
          console.log('some err');
          console.log(error);

          loading.dismiss();
            this.presentAlert();
        },{ enableHighAccuracy: true, timeout: 30000 });
}
  });

  }


reiniciarFiltros(){

    this.zone.run(() => {



  this.filtroSeleccion.horaSeleccionada = null;
  this.horaSeleccionada = null;

    this.filtroSeleccion.horaSeleccionadaDesde = null;
  this.horaSeleccionadaDesde = null;
    this.filtroSeleccion.horaSeleccionadaHasta = null;
  this.horaSeleccionadaHasta = null;
    this.filtroSeleccion.abierto = null;
        this.filtroSeleccion.disponible = null;
this.filtroSeleccion.ordenOpiniones= null;
this.filtroSeleccion.palabra= null;
  this.fechaSeleccionada=null;
   this.fechaSeleccionada=null;
    this.filtroSeleccion.filtroFecha = null;
  this.filtroSeleccion.orden = null;
  this.ordenarPor = null;
  this.filtroSeleccion.servicios=null;
  this.testCheckboxResult=[];
  this.information[2].nombre='Categorias';



    });


}

public filtroBusqueda(){

console.log(this.fechaSeleccionada);
  let loading = this.loadingCtrl.create({content : "Buscando ..."});
    loading.present();


  var d = new Date(Date.now());
  var n = d.getDay();
  var h = d.getHours();
  var m = d.getMinutes();
  this.filtroSeleccion.diaSemana = n;

if(this.filtroSeleccion.abierto){



  console.log(n);
 // this.filtroSeleccion.diaSemana = n;
   this.filtroSeleccion.horaSemana = h+':'+m+':00';
}

if(this.filtroSeleccion.disponible){

var d = new Date(Date.now());
var n = d.getDay();

  this.filtroSeleccion.diaSemana = n;

}
/*
if(!this.filtroSeleccion.lat || !this.filtroSeleccion.long){
  this.doRefresh();
}
if(this.autocomplete.input == ''){
   this.doRefresh();
}
*/
if(this.horaSeleccionada){
  this.filtroSeleccion.filtroHora=this.horaSeleccionada+':00';
}


if(this.horaSeleccionadaDesde){
  this.filtroSeleccion.horaSeleccionadaDesde=this.horaSeleccionadaDesde+':00';
}

if(this.horaSeleccionadaHasta){
  this.filtroSeleccion.horaSeleccionadaHasta=this.horaSeleccionadaHasta+':00';
}



//  this.filtroSeleccion.fecha= this.fechaSeleccionada;
if(this.fechaSeleccionada){

var ggg = this.fechaSeleccionada + ' 00:00:00';

var d = new Date(ggg);
console.log(d);
var n = d.getDay();

  this.filtroSeleccion.fecha= n;
}


this.filtroSeleccion.orden = this.ordenarPor;

    //this.filtroSeleccion.hora= this.horaSeleccionada;
    this.filtroSeleccion.servicios= this.testCheckboxResult;
    console.log(this.filtroSeleccion);

        this.apiProvider.buscarServiciosFiltro(this.filtroSeleccion)
    .then(data => { 
    loading.dismiss();

      if(data){


            console.log(data);
      this.resultadosCentro = data;
        this.navCtrl.push('ResultadosPage', {'resultados':data, 'filtro':this.filtroSeleccion});
      

      }
      else{
              this.reintentarAlert(this.filtroBusqueda.bind(this));
      }

      
     });


    
}


  showCheckbox() {
    let alert = this.alertCtrl.create({ cssClass: 'alertCustomCss'});
    alert.setTitle('Filtra por categoria');

    



    this.todasCat.forEach((item) => {

     alert.addInput({
      type: 'checkbox',
      label: item.nombre,
      value: item.idCategoria,
      checked: this.testCheckboxResult.includes(item.idCategoria)
    });


          });


//this.testCheckboxResult



    alert.addButton('Cancel');
    alert.addButton({
      text: 'Seleccionar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.information[2].nombre=this.getNames(data);
      }
    });
    alert.present();
  }

getNames = (ids) =>{
console.log(ids);
  var stringR = '';

  ids.forEach((elem, ind)=>{


  stringR +=  (ind == 0 ? '' : ', ') + this.todasCat.find((elems)=>{
          return elems.idCategoria == elem;
        }).nombre;

          
});

if(ids.length==0){stringR = 'Categorias'}
return stringR;
}

      onChange($event) {
    console.log($event);
    this.fechaSeleccionada = $event.replace(/-/g, "/");
    this.information[0].open=false;

  }

  toggleSection(i) {
  	if(i == 2){
  	this.showCheckbox()
  	}
      else if(i == 1){
   //hora
    }
  	else{
  		  this.information[i].open = !this.information[i].open;
  	}
  
  }
 

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }






}
