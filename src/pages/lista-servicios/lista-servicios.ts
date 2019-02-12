import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core'; 
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ListaServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-servicios',
  templateUrl: 'lista-servicios.html',
})
export class ListaServiciosPage {

nombreCat2:any;
busquedaInputLL:any={};
  constructor(public storage: Storage,
  private DomSanitizer: DomSanitizer,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public apiProvider: ApiProvider, public loadingController:LoadingController, public events: Events,public cdr: ChangeDetectorRef) {

this.seleccionIn = true;
this.geocoder = new google.maps.Geocoder;
this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
this.autocomplete = { input: '' };
this.autocompleteItems = [];


 this.showInfinite=true;
  this.categorias = [];
  this.resultados = [];
  this.contadorPagina=0;
  this.latitudePerson =0;
  this.longitudePerson=0;
this.categoriaSeleccionada =0;
this.subcategoriaSeleccionada=[];
this.cargaData = false;
this.favoritosActivo = false;
this.dataUser={};
this.rFavs=[];



  }



   presentProfileModal() {
   let profileModal = this.modalCtrl.create('BuscarModalPage');
   profileModal.present();
 }


ionViewWillEnter(){
  
      console.log('ionViewDidLoad ListaServiciosPage');
 
    console.log(this.categoriaSeleccionada);
    
}

  ionViewDidLoad() {

      this.section="one";
      

    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){
      this.favoritosActivo = true;
      this.dataUser = data;
      //this.menuActivo = true;
      }
      else{
      console.log('error');
      this.favoritosActivo = false;
      // this.menuActivo = false;
      } 
      

     });


      
      this.nombreCat2 =  this.navParams.get('nombreCat2');
      console.log(this.nombreCat2);
      this.categoriaSeleccionada =  this.navParams.get('nombre');
           // this.subS =  parseInt(this.navParams.get('sub'));
      this.apiProvider.getSubcategorias({idCategoria:this.categoriaSeleccionada})
      .then(data => {
       console.log(data);
              if(data){
              this.contadorPagina = 0;
        this.categorias = data || [];

        var ddata = this.navParams.get('sub') || []; 
        //ddata.push(parseInt(this.navParams.get('sub')));
        this.subcategoriaSeleccionada=ddata;
        console.log(ddata);

        this.buscarServicios(ddata,true,0);


       }
       else{
       this.reintentarAlert(this.ionViewDidLoad.bind(this));
       console.log('Ha ocurrido un error');

       }

       
      });



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
console.log(this.autocompleteItems);
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

  var dataEnv={};
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

      dataEnv.lat = results[0].geometry.location.toJSON().lat;
      dataEnv.lon = results[0].geometry.location.toJSON().lng;
      dataEnv.stringPlace = this.autocomplete.input;
      this.busquedaInputLL = dataEnv;
      console.log(dataEnv);
      this.buscarConDireccion(dataEnv);

    }
  })
}



cambiarSeleccion(id){
  
    console.log(id);

    //this.categoriaSeleccionada = id.idCategoria;

    
    
}


presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'GPS desactivado',
    subTitle: 'Debes activar el GPS para obtener los resultados',
    buttons: ['Cerrar']
  });
  alert.present();
}

   goMapa(){
var datasss= {'idCategoria':this.navParams.get('nombre'),
'idSubcategoriaS':this.subcategoriaSeleccionada};
console.log(datasss);
//this.navCtrl.push('MapaPage');
this.navCtrl.push('MapaPage',datasss);

  }

  filterFav(user: any) {
  console.log(user);
    return user.idCentro == 1
  }

      buscarServicios(id,continuar,pagina): Promise<any> {
return new Promise((resolve) => {
  
        if(pagina==0){
        this.showInfinite=true;
        }


        this.storage.get('coorLBY').then((value) => {

        if(value){
        console.log(new Date(value.expirationDate) > Date.now());
        if(new Date(value.expirationDate) > Date.now()){

        this.latitudePerson = value.lat;
        this.longitudePerson= value.lng;
        }

        }

   

       // this.cargaData = false;
        console.log(this.latitudePerson);
        console.log(this.longitudePerson);
         
         if(this.latitudePerson==0 && continuar){
        // this.presentAlert();
        this.getServiciosGPS(id,pagina);
         }

else{
         //this.categoriaSeleccionada = id;

         //this.subcategoriaSeleccionada=id;


        /*
        let filtro = {
        lat:this.latitudePerson,
        lon:this.longitudePerson,
        idCategoria:id
        }
        */



        let filtro = {
        pagina:pagina,
        idCliente:this.dataUser.idCliente || 0,
        lat:this.latitudePerson,
        lon:this.longitudePerson,
        idSubcategoria: id.length>0 ? id.toString() : null
        };

      this.busquedaInputLL.lat = this.latitudePerson;
         this.busquedaInputLL.lon = this.longitudePerson;
 this.busquedaInputLL.stringPlace = 'Mi ubicacion';


        this.apiProvider.buscarServicios2(filtro)
        .then(data => {

        if(data){
        resolve();
        console.log(data);
        this.cargaData = true;

        if(data.length==0){
        this.showInfinite=false;
        }


        if(data['cercania']){
        this.contadorPagina=pagina+10;

        //this.rFavs = data['favoritos'];
        if(pagina==0){
        this.resultados = [];
        }
        data['cercania'].forEach((item,index)=>{
          this.resultados.push(item);
        });

        }
        else{console.log('Ha ocurrido un error');}

                  this.cdr.detectChanges();
        }
        else{
        this.reintentarAlert(this.ionViewDidLoad.bind(this));
        }

        });


}
       });
    });
}


buscarConDireccion(item){
    let loading = this.loadingController.create({content : "Obteniendo ubicacion"});
    loading.present();
/*
         var fechaExpiracion = new Date();
          fechaExpiracion.setHours(fechaExpiracion.getHours() + 1);
          this.storage.set('coorLBY', {'lat':item.lat,
                                  'lng':item.lon,
                                    'expirationDate': fechaExpiracion});
          this.buscarServicios(this.subcategoriaSeleccionada,true,0);
*/

        let filtro = {
        pagina:0,
        idCliente:this.dataUser.idCliente || 0,
        lat:item.lat,
        lon:item.lon,
        idSubcategoria: this.subcategoriaSeleccionada.length>0 ? this.subcategoriaSeleccionada.toString() : null
        };


        this.apiProvider.buscarServicios2(filtro)
        .then(data => {


        loading.dismiss();

        if(data){
        console.log(data);
        this.cargaData = true;

        if(data.length==0){
        this.showInfinite=false;
        }


        if(data['cercania']){
       // this.contadorPagina=0+10;

        //this.rFavs = data['favoritos'];
        if(true){
        this.resultados = [];
        }
        data['cercania'].forEach((itemss,index)=>{
          this.resultados.push(itemss);
        });

        }
        else{console.log('Ha ocurrido un error');}

                  this.cdr.detectChanges();
}
else{
  this.reintentarAlert(this.ionViewDidLoad.bind(this));
}

        });

}
        doRefresh(refresher){
       /*
          this.latitudePerson = 9.9931605;
          this.longitudePerson = -84.2307427;
 */

      this.autocomplete.input = '';

    let loading = this.loadingController.create({content : "Obteniendo ubicacion",enableBackdropDismiss: false});
    loading.present();

      console.log('gps');
        navigator.geolocation.getCurrentPosition((pos) => {

          console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
          this.latitudePerson = pos.coords.latitude;
          this.longitudePerson = pos.coords.longitude;

          var fechaExpiracion = new Date();
          fechaExpiracion.setHours(fechaExpiracion.getHours() + 1);
          console.log(fechaExpiracion);

          this.storage.set('coorLBY', {'lat':pos.coords.latitude,
                                  'lng':pos.coords.longitude,
                                    'expirationDate': fechaExpiracion});

                          
          this.buscarServicios(this.subcategoriaSeleccionada,true,0).then(()=>{
               loading.dismiss();
          refresher.complete();
          });                           
     
     



        }, function(error) {
          console.log('some err');
          console.log(error);
          loading.dismiss();
            this.presentAlert();
          refresher.complete();

        },{ enableHighAccuracy: true, timeout: 30000 });

   
      }




      goCentro(idCentro) {
    // this.navCtrl.push('PerfilCentroPage');  
    console.log(this.categoriaSeleccionada);
       this.navCtrl.push('PerfilCentroPage', {'idCentro':idCentro, 'idServicioSeleccionado':this.categoriaSeleccionada});
  		}

      getServiciosGPS(id,pagina){
       /*
          this.latitudePerson = 9.9931605;
          this.longitudePerson = -84.2307427;
 */

    let loading = this.loadingController.create({content : "Obteniendo ubicacion",enableBackdropDismiss: false});
    loading.present();

      console.log('gps');
        navigator.geolocation.getCurrentPosition((pos) => {

          console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
          this.latitudePerson = pos.coords.latitude;
          this.longitudePerson = pos.coords.longitude;

          var fechaExpiracion = new Date();
          fechaExpiracion.setHours(fechaExpiracion.getHours() + 1);
          console.log(fechaExpiracion);

          this.storage.set('coorLBY', {'lat':pos.coords.latitude,
                                  'lng':pos.coords.longitude,
                                    'expirationDate': fechaExpiracion});

          loading.dismiss();
          this.buscarServicios(id,true, pagina);


        }, (error)=>{
          console.log('some err');
          console.log(error);
          loading.dismiss();
          this.presentAlert();
          this.buscarServicios(id,false,pagina);
        },{ enableHighAccuracy: true, timeout: 30000 });

   
      }


/*

      dataEnv.lat = results[0].geometry.location.toJSON().lat;
      dataEnv.lon = results[0].geometry.location.toJSON().lng;
      dataEnv.stringPlace = this.autocomplete.input;
      this.busquedaInputLL = dataEnv;

      */

  openBusqueda() {
  console.log(this.navParams.get('nombre'));
  this.navCtrl.push('BuscarModalPage',{idCat:this.navParams.get('nombre'),
                                        lat:this.busquedaInputLL.lat || 0,
                                        lon:this.busquedaInputLL.lon || 0,
                                        stringPlace:this.busquedaInputLL.stringPlace || ' '}); 
      //this.presentProfileModal();
      //
      }

      

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
        var ddata = this.subcategoriaSeleccionada; 
    

console.log(ddata)
    this.buscarServicios(ddata,false,this.contadorPagina).then(()=>{
    resolve();
    })

      /*
        setTimeout(() => {
          for (var i = 0; i < 30; i++) {
            this.items.push( this.items.length );
          }

          console.log('Async operation has ended');
          resolve();
        }, 500);
      */

    })



  }

 dosInfinite(infiniteScroll) {

  //this.buscarServicios(ddata,false,this.contadorPagina);

    console.log(this.contadorPagina);



/*
   
      setTimeout(() => {
        console.log('listo')

        var ddata = []; 
        ddata.push(parseInt(this.navParams.get('sub')));
        this.buscarServicios(ddata,false,this.contadorPagina);

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    */
  }





}
