import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {


 @ViewChild('select1') select1: Select;



map: GoogleMap;

subcategorias=[];
categorias=[];
dataMarcas: any = [];
subS: any;
myPosition: any = {};
markers: any[] = [
  {
    position:{
      latitude: -17.3666745,
      longitude: -66.2387878,
    },
    title:'Point 1'
  },
  {
    position:{
      latitude: -17.3706884,
      longitude: -66.2397749,
    },
    title:'Point 2'
  },
  {
    position:{
      latitude: -17.391398,
      longitude: -66.2407904,
    },
    title:'Point 3'
  },
  {
    position:{
      latitude: -17.3878887,
      longitude: -66.223664,
    },
    title:'Point 4'
  },
];

idCategoriaS=0;
idSubcategoriaS:any=[];
sscategorias:any=[];
nombreCategoriaTitulo:any;
nombreSubcategoriaTitulo:any;

pathToImg:any;
subCategoriaSeleccionada:any=[];


subCategoriaSeleccionada2:any=[];


  constructor(public navCtrl: NavController, private DomSanitizer: DomSanitizer,public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController,public storage: Storage,public plt: Platform, public ngZone:NgZone) {
this.categoriaSeleccionada='';
  /*
  if(this.map){
  console.log('setVisible false');
  this.map.setVisible(false);
  }
  */

 this.pathToImg = this.plt.is('ios') ? 'www/assets/' : this.plt.is('android') ? 'file:///android_asset/www/assets/' : 'assets/';


  }


  ionViewDidLoad() {
this.idCategoriaS = this.navParams.get('idCategoria') ; 
this.idSubcategoriaS = this.navParams.get('idSubcategoriaS') ; 

this.nombreCategoriaTitulo = this.navParams.get('nombreCat') ; 
this.nombreSubcategoriaTitulo = this.navParams.get('nombreSub') ; 

this.subS =  parseInt(this.idSubcategoriaS);

console.log('params');
console.log(this.idSubcategoriaS);
   this.loading = this.loadingCtrl.create({content : "Buscando negocios cercanos",
   enableBackdropDismiss: true});
      this.loading.present();
     
         // this.getCategorias();
          this.getSCateg();

}


  ionViewDidEnter() {
  // this.loading = this.loadingCtrl.create({content : "Buscando negocios cercanos"});
    //  this.loading.present();
   //  this.getServiciosGPS();



  // create a new map by passing HTMLElement

//verificar si sirve en ionviewdidenter
//verificar reduciendo widj
//verificar con push y setRoot
//cambiar fondo oclor


 

  //this.gpsServices();

    console.log('ionViewDidLoad MapaPage');


  }

    getCategorias() {

        this.apiProvider.categoriasHome()
      .then(data => {
       console.log(data);
              if(data){

         this.categorias = data['categorias'] || [];
          //this.select1.open();
       }
       else{console.log('Ha ocurrido un error');}

       
      });
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



  getSCateg(){

        this.apiProvider.getSubcategorias({idCategoria:this.idCategoriaS})
      .then(data => {
       console.log(data);
     

              if(data){

        this.sscategorias = data || [];
        var ddata = []; 
        ddata.push(this.subS);

        this.subCategoriaSeleccionada2=ddata;
        console.log(ddata);
        this.getServiciosGPS();
        //this.buscarServicios(ddata,true,0);


       }
       else{
      this.loading.dismiss();
       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.ionViewDidLoad.bind(this));

       }

       
      });


  }




buscarServicios(){
   this.loading = this.loadingCtrl.create({content : "Buscando negocios cercanos"});
   this.loading.present();
   
console.log('cargarMapa');
  this.map.clear();



      var dda = { idSubcategoria: this.subCategoriaSeleccionada2, lat: this.myPosition.latitude, lon:  this.myPosition.longitude};
      console.log(dda);
              this.apiProvider.getCentrosMapa(dda)
    .then(data => { 

      console.log(data);
      this.dataMarcas = data;

      data.forEach((element, index) => {
        var imagenLink = this.pathToImg+'imgs/mdactive.png'; 

          var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();

          let frame: HTMLElement = document.createElement('div');
          frame.className='centradoTexto'
          frame.innerHTML = [`<ion-card><ion-card-content><div style="padding:10px;display:inline-block;width: 100%;">
                <img src="http://50.116.17.150:3000/`+element.idFoto+`" 
        onError="this.src='assets/imgs/fotoComercio.png';"
        style="display: inline-block;height: 50px;margin-right:5px; width: 50px !important;vertical-align: top;">
    <div style="display: inline-block;">
     <span style="margin: 2px 0px 0px 0px;font-size: 15px;color: #333;">`+element.nombre+`</span><br>
 <span class="itemComercio">
 <span style="color:#888;font-size: 14px;">

 <ion-icon style='font-size:16px' name='md-star' role='img' class='icon icon-ios ion-md-star ratingStar'> </ion-icon>`+(element.rate || 0)+`  (`+element.cantRate+`)</span>



        <span style="    display: block;font-size: 14px;font-weight: 800;
    color: #EC527E;">$`+element.pMin+`<span [hidden]='`+element.pMin+` == `+element.pMax+`'>- $`+element.pMax+`</span></span>
</span>
    </div></div></ion-card-content></ion-card>`].join("");

console.log(frame.getElementsByTagName("DIV"));


         var button = frame.getElementsByTagName("DIV")[0];
         button.addEventListener("click", ()=>{

          this.ngZone.run(() => {

          this.navCtrl.push('PerfilCentroPage', {'idCentro':element.idCentro, 'idServicioSeleccionado':this.idCategoriaS});

          });

         

         });

          htmlInfoWindow.setContent(frame, {
      width: "230px",
      height: "100px"
        });


        this.map.addMarker({
        'position': {lng: element.longitud, lat: element.latitud},
         'icon': this.pathToImg+'imgs/mdactive.png'
        }, (marker)=>{

          marker.on(plugin.google.maps.event.MARKER_CLICK, ()=> {
            marker.setIcon(this.pathToImg+'imgs/mactive.png');
            htmlInfoWindow.open(marker);
          });



          marker.on(plugin.google.maps.event.INFO_CLOSE, ()=>{
             marker.setIcon(this.pathToImg+'imgs/mdactive.png');
          });


          //marker.trigger(plugin.google.maps.event.MARKER_CLICK);

        });


      });


      this.loading.dismiss();

     });
      


}
const filterFav = (user: any) => {
  //console.log(user);
    if(this.categoriaSeleccionada == 0){
    return true;
    }

    if(this.subcategorias.length>0){
      
     return [user.idSubcategoria].some(r=> this.subCategoriaSeleccionada.includes(parseInt(r)));


    }
    else{
   // return false;
       // return user.idCategoria == this.categoriaSeleccionada;
    return [user.idCategoria].includes(String(this.categoriaSeleccionada));
    }

  }

getSubCat(tt,yy){

     console.log(tt);
      console.log(this.map);
      this.map.clear();
      this.marcarMapa();

      this.apiProvider.getSubcategorias({idCategoria:tt})
      .then(data => {
      console.log(data);
      if(data){
      this.subcategorias = data || [];

            var ddata = data.map(item=>{
          return item.idSubcategoria;
        });

        this.subCategoriaSeleccionada = ddata;
        this.idSubcategoriaS = ddata;
         console.log(this.idSubcategoriaS);
      } 
      });
    }



const marcarMapa = () => {

      this.dataMarcas.filter(item => (this.categoriaSeleccionada == 0 || item.categoriasCentro.split(',').includes(String(this.categoriaSeleccionada)))).forEach((element, index) => {

    var imagenLink = this.pathToImg+'imgs/mdactive.png'; 

          var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();

          let frame: HTMLElement = document.createElement('div');
          frame.className='centradoTexto'
          frame.innerHTML = [`<ion-card><ion-card-content><div style="padding:10px 0px;display:inline-block;width: 100%;">
                <img src="http://50.116.17.150:3000/`+element.idFoto+`" 
        onError="this.src='assets/imgs/fotoComercio.png';"
        style="display: inline-block;height: 50px;margin-right:5px; width: 50px !important;vertical-align: top;">
    <div style="display: inline-block;    width: 150px;
    white-space: nowrap;
    overflow: overlay;
    text-overflow: ellipsis;">
     <span style="margin: 2px 0px 0px 0px;font-size: 15px;color: #333;">`+element.nombre+`</span><br>
 <span class="itemComercio">
 <span style="color:#888;font-size: 14px;">

 <ion-icon style='font-size:16px' name='md-star' role='img' class='icon icon-ios ion-md-star ratingStar'> </ion-icon>`+(element.rate || 0)+`  (`+element.cantRate+`)</span>



        <span style="    display: block;font-size: 14px;font-weight: 800;
    color: #EC527E;">$`+element.pMin+`<span [hidden]='`+element.pMin+` == `+element.pMax+`'>- $`+element.pMax+`</span></span>
</span>
    </div></div></ion-card-content></ion-card>`].join("");

console.log(frame.getElementsByTagName("DIV"));


         var button = frame.getElementsByTagName("DIV")[0];
         button.addEventListener("click", ()=>{

          this.ngZone.run(() => {

          this.navCtrl.push('PerfilCentroPage', {'idCentro':element.idCentro, 'idServicioSeleccionado':this.idCategoriaS});

          });

         

         });

          htmlInfoWindow.setContent(frame, {
      width: "230px",
      height: "100px"
        });


        this.map.addMarker({
        'position': {lng: element.longitud, lat: element.latitud},
         'icon':this.pathToImg+'imgs/mdactive.png'
        }, (marker)=>{

          marker.on(plugin.google.maps.event.MARKER_CLICK, ()=> {
            marker.setIcon(this.pathToImg+'imgs/mactive.png');
            htmlInfoWindow.open(marker);
          });



          marker.on(plugin.google.maps.event.INFO_CLOSE, ()=> {
             marker.setIcon(this.pathToImg+'imgs/mdactive.png');
          });


          //marker.trigger(plugin.google.maps.event.MARKER_CLICK);

        });


      });


}



    filtrarSubCategorias(tt,yy){
  console.log(tt,yy)
  //this.map.clear();
  //this.loadMap();
}



const addMarker = (options) => {
  let markerOptions: MarkerOptions = {
    position: new LatLng(options.position.latitude, options.position.longitude),
    title: options.title
  };
  this.map.addMarker(markerOptions);
}



const getCentrosCercanos = () => {
    this.apiProvider.getCentrosMapa({lat: this.myPosition.latitude, lon:  this.myPosition.longitude})
    .then(data => { 
      console.log(data);
      this.dataMarcas = data || [];
     });
}

regresawe(){
   this.navCtrl.setRoot('InicioPage');
}


getEstrella(numero, rate){

if(rate && rate>=numero){
  return `<ion-icon name='md-star' role='img' class='icon icon-ios ion-md-star ratingStar'> </ion-icon>`;
}
else{
  return `<ion-icon name='md-star' role='img' class='icon icon-ios ion-md-star'> </ion-icon>`;
}

}

        /*
        'icon': {
        'url': imagenLink,
        size: {
            width: 35,
            height: 35
         }
        }
        */



 const goTo = (idCentro) => {console.log(idCentro);}



  const loadMap = () => {


  let element: HTMLElement = document.getElementById('map');

  this.map = plugin.google.maps.Map.getMap(element,
  {
    controls: {
    'myLocation': true,  
    'zoom': true          // android only
  },
  'camera' : {
    target: {lat: this.myPosition.latitude, lng:  this.myPosition.longitude},
    zoom: 15
  },
  'preferences': {
    'zoom': {
      'minZoom': 13,
      'maxZoom': 17
    },
    padding: {
      left: 10,
      top: 10,
      bottom:53,
      right: 10
    }
    }
    });
    
      let position: CameraPosition = {
       target: {lat: this.myPosition.latitude, lng:  this.myPosition.longitude},
      zoom: 16,
      tilt: 30
      };

      this.map.one(plugin.google.maps.event.MAP_READY, ()=>{
      var dda = { idSubcategoria: this.subCategoriaSeleccionada2, lat: this.myPosition.latitude, lon:  this.myPosition.longitude};
      console.log(dda);
              this.apiProvider.getCentrosMapa(dda)
    .then(data => { 

if(data){      console.log(data);
      this.dataMarcas = data;

      data.forEach((element, index) => {
        var imagenLink = this.pathToImg+'imgs/mdactive.png'; 

          var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();

          let frame: HTMLElement = document.createElement('div');
          frame.className='centradoTexto'
          frame.innerHTML = [`<ion-card><ion-card-content><div style="padding:10px 0px;display:inline-block;width: 100%;">
                <img src="http://50.116.17.150:3000/`+element.idFoto+`" 
        onError="this.src='assets/imgs/fotoComercio.png';"
        style="display: inline-block;height: 50px;margin-right:5px; width: 50px !important;vertical-align: top;">
    <div style="display: inline-block;    width: 150px;
    white-space: nowrap;
    overflow: overlay;
    text-overflow: ellipsis;">
     <span style="margin: 2px 0px 0px 0px;font-size: 15px;color: #333;">`+element.nombre+`</span><br>
 <span class="itemComercio">
 <span style="color:#888;font-size: 14px;">

 <ion-icon style='font-size:16px' name='md-star' role='img' class='icon icon-ios ion-md-star ratingStar'> </ion-icon>`+(element.rate || 0)+`  (`+element.cantRate+`)</span>



        <span style="    display: block;font-size: 14px;font-weight: 800;
    color: #EC527E;">$`+element.pMin+`<span [hidden]='`+element.pMin+` == `+element.pMax+`'>- $`+element.pMax+`</span></span>
</span>
    </div></div></ion-card-content></ion-card>`].join("");

console.log(frame.getElementsByTagName("DIV"));


         var button = frame.getElementsByTagName("DIV")[0];
         button.addEventListener("click", ()=>{

          this.ngZone.run(() => {

          this.navCtrl.push('PerfilCentroPage', {'idCentro':element.idCentro, 'idServicioSeleccionado':this.idCategoriaS});

          });

         

         });

          htmlInfoWindow.setContent(frame, {
      width: "230px",
      height: "100px"
        });


        this.map.addMarker({
        'position': {lng: element.longitud, lat: element.latitud},
         'icon':this.pathToImg+'imgs/mdactive.png'
        }, (marker)=> {

          marker.on(plugin.google.maps.event.MARKER_CLICK, ()=> {
            marker.setIcon(this.pathToImg+'imgs/mactive.png');
            htmlInfoWindow.open(marker);
          });



          marker.on(plugin.google.maps.event.INFO_CLOSE, ()=> {
             marker.setIcon(this.pathToImg+'imgs/mdactive.png');
          });


          //marker.trigger(plugin.google.maps.event.MARKER_CLICK);

        });


      });


      this.loading.dismiss();}
      else{
      this.loading.dismiss();
       this.reintentarAlert(this.ionViewDidLoad.bind(this));
      }

     });
      



      });
    }






    getCentrosGPS(){





    }

    goLista(){

       // var fs = {'nombre':this.categoriaSeleccionada,'sub':0};

 var fs = {'nombre':this.idCategoriaS,
 'sub':this.subCategoriaSeleccionada2,
 'nombreCat2':this.nombreCategoriaTitulo};


  console.log(fs);
  this.navCtrl.push('ListaServiciosPage', fs);

    }

        presentAlert() {
          let alert = this.alertCtrl.create({
            title: 'GPS desactivado',
            subTitle: 'Activa el GPS para filtrar por distancia',
            buttons: ['Cerrar']
          });
          alert.present();
        }

        getServiciosGPS(){

        navigator.geolocation.getCurrentPosition((pos) => {

  			this.myPosition = {
  			latitude: pos.coords.latitude,
  			longitude: pos.coords.longitude
  			};

        var fechaExpiracion = new Date();
        fechaExpiracion.setHours(fechaExpiracion.getHours() + 1);        
        this.storage.set('coorLBY', {'lat':pos.coords.latitude,
                                  'lng':pos.coords.longitude,
                                    'expirationDate': fechaExpiracion});


        this.loadMap();

        }, (error)=>{
          console.log('storageme err');
          console.log(error);

          this.loading.dismiss();
          this.requestLocationAccuracy();
        },{ enableHighAccuracy: true, timeout: 30000 });

    
      }


    gpsServices() {


  }




onError(error) {
    console.error("The following error occurred: " + error);
}


 requestLocationAuthorization() {
    cordova.plugins.diagnostic.requestLocationAuthorization((status) => {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            if(this.plt.is('ios')){
                this.onError("Location services is already switched ON");
            }else{
                this._makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            this.requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            if(this.plt.is('android')){
                this.onError("User denied permission to use location");
            }else{
                this._makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            this.onError("User denied permission to use location");
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            this.onError("Location services is already switched ON");
            break;
    }
}, this.onError());
}


 requestLocationAccuracy() {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus((status) => {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            if(this.plt.is('ios')){
                this.onError("Location services is already switched ON");
            }else{
                this._makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            this.requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            if(this.plt.is('android')){
                this.onError("User denied permission to use location");
            }else{
                this._makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            this.onError("User denied permission to use location");
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            this.onError("Location services is already switched ON");
            break;
    }
}, this.onError());
}

 _makeRequest(){
    cordova.plugins.locationAccuracy.canRequest((canRequest) => {
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(()=>{

                    console.log("Location accuracy request successful");
                    this.getServiciosGPS();

                }, (error) => {
                    this.onError("Error requesting location accuracy: " + JSON.stringify(error));
                    if (error) {
                        // Android only
                        this.onError("error code=" + error.code + "; error message=" + error.message);
                        if (this.plt.is('android') && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        } else {
            // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
            // On Android, this will occur if the app doesn't have authorization to use location.
            this.onError("Cannot request location accurac // android");
        }
    });
}





}
