import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the CuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {
imageURI:any;
imageFileName:any;
porcenBarra=0;
  constructor(public cdr: ChangeDetectorRef,private DomSanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController,public loadingCtrl: LoadingController,public events: Events, public zone: NgZone,public apiProvider: ApiProvider, public storage: Storage) {

  this.editarData=true;
  this.dataUserInput={};
    this.dataUser={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');


    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      /*
      this.dataUserInput = JSON.parse(JSON.stringify(data));
      this.dataUser = data;
      this.porcenBarra = (((this.dataUser.exp  % 1500)/(this.dataUser.appexp))*100) + '%';
      */

      let loading = this.loadingCtrl.create({content : "Cargando"});
      loading.present();
      this.apiProvider.getUserInfo({idCliente:data.idCliente})
      .then(datas => {
      console.log(datas);
      if(datas && datas[0].idCliente == data.idCliente ){

        this.dataUserInput = JSON.parse(JSON.stringify(datas[0]));
        this.dataUser = datas[0];
        this.porcenBarra = (((this.dataUser.exp  % 1500)/(this.dataUser.appexp))*100) + '%';

      }
      else{
        console.log('Ha ocurrido un error');
         this.reintentarAlert(this.ionViewDidLoad.bind(this));
        }


      loading.dismiss();
      });

      }
      else{
      console.log('error');
      // this.menuActivo = false;
     
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



  agregadoOk() {
  let alert = this.alertCtrl.create({
    title: 'Editado correctamente',
    subTitle: 'Sus datos han sido editados correctamente',
    buttons: ['Cerrar']
  });
  alert.present();
}


getUDPE(valueExp){
  
  var valExp = parseInt(valueExp) || 0;
  return valExp % 1500;
}




  errorSu() {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Ha ocurrido un error',
    buttons: ['Cerrar']
  });
  alert.present();
}


    getPorcentaje(){

    let enviar = ((900)/(this.dataUser.completadas*100)) + '%';
    console.log(enviar);
    return enviar;
       
  
  }




 getImages = () => {
  const options: CameraOptions = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
  }

  navigator.camera.getPicture((imageData) => {
console.log(imageData);
     this.zone.run(()=>{ this.imageFileName = imageData; }); 

  }, (err) => {

    console.log(err);


  },options);
}


seleccionarGenero(genero){

  if(!this.editarData){ 
  this.dataUser.idGenero = genero;
    }

}
 

  guardarCambios(){

    if(this.imageFileName){

    this.uploadFile(this.dataUser);

    }
    else{

         let loading = this.loadingCtrl.create({content : "Cargando ..."});
          loading.present();


          this.apiProvider.editarUsuario(this.dataUser)
          .then(data => {

          loading.dismiss();

          console.log(data);
          if(data && data.affectedRows>0){

           //this.storage.set(`usr_tok_by`, this.dataUser);


            this.storage.get('usr_tok_by').then((value) => {
            // console.log(value);
            var da = value;

            da.genero = this.dataUser.genero;
            da.telefono = this.dataUser.telefono;
            da.nombre = this.dataUser.nombre;
             da.idGenero = this.dataUser.idGenero;
                        da.fechaNacimiento = this.dataUser.fechaNacimiento;

            console.log(da);

            this.storage.set(`usr_tok_by`, da);
            this.events.publish('userCH');
            this.cdr.detectChanges();

            }).catch(() => resolve(false))

          this.agregadoOk();
          //console.log('borrada');
          this.editarData=true;

          }
          else{
          console.log('Ha ocurrido un error');
          this.reintentarAlert(this.guardarCambios.bind(this));
          }


          });

      }


   //console.log(this.dataUser);

  }



  cancelarEdicion(){
   this.dataUser = this.dataUserInput;
   this.editarData=true;
   this.imageFileName=undefined;

  }



  uploadFile = (datak) => {
  let loader = this.loadingCtrl.create({
    content: "Guardando..."
  });
  loader.present();
  //const fileTransfer: FileTransferObject = this.transfer.create();
/*
  let options = new FileUploadOptions();' = {
    fileKey: 'ionicfile',
    fileName: 'ionicfile',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  };
*/
 let options = new FileUploadOptions();
  options.fileKey = "ionicfile";
options.fileName = 'ionicfile2';
options.mimeType = "image/jpeg";
options.chunkedMode = false;
options.headers =  {};

options.params = datak;


var ft = new FileTransfer();
  ft.upload(this.imageFileName, 'http://50.116.17.150:3000/editarCF', (datag) => {
    console.log(datag);
    //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    //this.presentToast("Image uploaded successfully");

  var data = JSON.parse(datag.response);
    console.log(data);
              if(data.data && data.data.affectedRows>0){

           //this.storage.set(`usr_tok_by`, this.dataUser);


            this.storage.get('usr_tok_by').then((value) => {
            // console.log(value);
            var da = value;

            da.genero = this.dataUser.genero;
            da.telefono = this.dataUser.telefono;
            da.nombre = this.dataUser.nombre;
            da.idFoto = data.idFoto;
            console.log(da);
            this.storage.set(`usr_tok_by`, da);


            }).catch(() => resolve(false));

          loader.dismiss();

          this.agregadoOk();
        

          //console.log('borrada');
          this.editarData=true;

          }
          else{

            loader.dismiss();
             this.errorSu();
          console.log('Ha ocurrido un error');
          }


  }, (err) => {
    console.log(err);
    loader.dismiss();
   // this.presentToast(err);
  },options);


}




}
