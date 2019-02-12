import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import { DomSanitizer } from '@angular/platform-browser';

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



  constructor(public navCtrl: NavController, private DomSanitizer: DomSanitizer,public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
        this.section="one";
    console.log('ionViewDidLosad CuponesPage');


            this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.dataUser = data;
      //this.menuActivo = true;
      }
      else{
      console.log('error');
      // this.menuActivo = false;
      } 
      
      this.getCupones(this.dataUser.idCliente);
     });



  }
  getCupones(idCliente) {

    let loading = this.loadingCtrl.create();
    loading.present();

    let dataE = {idCliente:idCliente};
      console.log(dataE);
        this.apiProvider.getCuponesApp(dataE)
      .then(data => {
      loading.dismiss();
       console.log(data);
              if(data){

         this.cupones = data || [];
       }
       else{

       console.log('Ha ocurrido un error');
      this.reintentarAlert(this.ionViewDidLoad.bind(this));
       }

       
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




      presentAlert(titulo,mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Cerrar']
    });
    alert.present();
  }


  filtroDisponible(user: any) {

    var cc = new Date(user.fechaExpira);


    return user.estado == 1 && cc > Date.now();
  }


    usarTicket(id) {
    // this.navCtrl.push('PerfilCentroPage');  
     //  this.navCtrl.push('PerfilCentroPage', {'idCentro':idCentro, 'idServicioSeleccionado':this.categoriaSeleccionada});

         this.navCtrl.push('CentrocuponesPage', {'idCupon':id});


      }
  


getNombreE(str){

var tam = str.split(',').length;
if(tam==1){
 return str;
} 
if(tam>1){
 return str.split(',')[0] + ' y '+(tam-1)+' negocios mas.';
}  
  
}

    filtroUsado(user: any) {
  console.log(user);
      var cc = new Date(user.fechaExpira);

    return user.estado == 2 && cc>Date.now();
  }
    canjear(codigo: string) {

      console.log(codigo);

    if(codigo){

    this.usarCodigo(codigo,this.dataUser.idCliente);

    }
    else{

     this.presentAlert('Cupón Inválido','Por favor verifique que haya ingresado el código correctamente');

    }


  }


  usarCodigo(codigo,idCliente) {

    let dataE = {codigo:codigo,idCliente:idCliente};
      console.log(dataE);
        this.apiProvider.canjearCupon(dataE)
      .then(data => {
       console.log(data);
              if(data.insertId>0){
          this.getCupones(idCliente);

               this.presentAlert('Agregado','Cupon agregado correctamente');
     this.codigo='';
     

      
       }
       else{this.presentAlert('Cupón Inválido','Por favor verifique que haya ingresado el código correctamente');}

       
      });
  }


  filtroExpirado(user: any) {
 
  var cc = new Date(user.fechaExpira);
    return cc < Date.now()
  }

  fcompartir() {
 // not supported on some apps (Facebook, Instagram)
    var options = {
      message: 'YourBeauty. La nueva forma de reservar en salones de belleza y al instante', 
      subject: 'Prueba ya Yourbeauty', // fi. for email
      url: 'https://www.yourbeauty.com.pa/',
      chooserTitle: 'Selecciona un app'
    };
     
    var onSuccess = function(result) {
      console.log("Share completed? "); 
       console.log(result); 

    };
     
    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    };
     
    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

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
