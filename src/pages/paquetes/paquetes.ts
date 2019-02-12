import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PaquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paquetes',
  templateUrl: 'paquetes.html',
})
export class PaquetesPage {

subcategorias=[];
categorias=[];

  constructor(public navCtrl: NavController, private DomSanitizer: DomSanitizer, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController,public zone: NgZone,public storage: Storage) {

    this.latitudePerson =0;
  this.longitudePerson=0;
this.categoriaSeleccionada='';

  }

  ionViewDidLoad() {


  //this.getServiciosGPS();
    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){
      this.dataUser = data;
      }
      else{
      console.log('error');

      } 
      this.doRefresh();
     });


    console.log('ionViewDidLoad FavoritosPage');
          this.getCategorias();
   
  }



  const filterFav = (user: any) => {
 // console.log(user);
    if(this.categoriaSeleccionada == 0){
    return true;
    }

    if(this.subcategorias.length>0){
      
     return user.some(r=> this.subCategoriaSeleccionada.includes(parseInt(r.idSubcategoria)));


    }
    else{

	user.some(elem => elem.idCategoria  == this.categoriaSeleccionada);  
   // return [user.idCategoria].includes(String(this.categoriaSeleccionada));
    }

  }

/*

var found = array1.find(function(element) {
  return element > 10;
});

*/
        doRefresh(){

        this.storage.get('coorLBY').then((value) => {

        if(value && (new Date(value.expirationDate) > Date.now())){

        this.latitudePerson = value.lat;
        this.longitudePerson= value.lng;
         this.getFavoritos();  
        }
        else{

    let loading = this.loadingCtrl.create({content : "Obteniendo ubicacion",enableBackdropDismiss: true});
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

           this.getFavoritos();                         
          loading.dismiss();

     



        }, (error) => {
        loading.dismiss();
          console.log('some err');
          console.log(error);
          this.getFavoritos();
          
            this.presentAlert();


        },{ enableHighAccuracy: true, timeout: 30000 });


        }
        });
       /*
          this.latitudePerson = 9.9931605;
          this.longitudePerson = -84.2307427;
 */


   
      }


    getSubCat(tt,yy){

    //this.favoritos = this.favoritos;
      console.log(tt,yy)
      this.apiProvider.getSubcategorias({idCategoria:tt})
      .then(data => {
      console.log(data);
      if(data){
      this.subcategorias = data || [];

            var ddata = data.map(item=>{
          return item.idSubcategoria;
        });

        this.subCategoriaSeleccionada = ddata;
      } 
      });
    }

filtrarSubCategorias(tt,yy){
  console.log(tt,yy)
}


    getCategorias() {

        this.apiProvider.categoriasHome()
      .then(data => {
       console.log(data);
              if(data){

         this.categorias = data['categorias'] || [];
       }
       else{console.log('Ha ocurrido un error');}

       
      });
  }

      getServiciosGPS(){
       /*
          this.latitudePerson = 9.9931605;
          this.longitudePerson = -84.2307427;
      */

    let loading = this.loadingCtrl.create({content : "Obteniendo ubicacion",enableBackdropDismiss: true});
    loading.present();

      console.log('gps');
        navigator.geolocation.getCurrentPosition((pos) => {

          console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
          this.latitudePerson = pos.coords.latitude;
          this.longitudePerson = pos.coords.longitude;
          loading.dismiss();
     


        }, function(error) {
          console.log('some err');
          console.log(error);
          loading.dismissA();
        },{ enableHighAccuracy: true, timeout: 30000 });

   
      }




  getFavoritos(idCliente) {

    let loading = this.loadingCtrl.create();
    loading.present();

      	let dataE = {lat:this.latitudePerson,
        lon:this.longitudePerson};
        this.apiProvider.paquetesActivos(dataE)
      .then(data => {
loading.dismiss()

              if(data){
              
      this.zone.run(()=>{ 
   			this.favoritos = Object.values(data) || [];
       }); 
       
       }
       else{
       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.ionViewDidLoad.bind(this));
       }

       
      },err=>{loading.dismiss();});
  }

  filtroCategoria() {
    //console.log('ionViewDidLoad FavoritosPage');
     this.showCheckbox();
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


    goCentro(idCentro,serv) {
    console.log(serv);


      this.apiProvider.addProductoPaquete(serv)
      .then(data => {
      let dataE = {'servicios':[],'idCentro':idCentro,'paquete':true,'cupon':null,
      'costoPaquete': serv[0].precioPaquete, 'idPaquete':serv[0].idPaqueteCentro };
      console.log(dataE);
      this.navCtrl.push('ReservaPage', dataE);

      });

   


      }
  

}
