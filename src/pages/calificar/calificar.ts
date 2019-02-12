import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CalificarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-calificar',
  templateUrl: 'calificar.html',
})
export class CalificarPage {
dataUser:any;

readOnly=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController,private sanitizer: DomSanitizer) {
  this.dataCentro={};
  this.rate={};
  this.comentario='';
  this.botonActivo = false;
  }

  ionViewDidLoad() {

  console.log(this.navParams.data);
  this.dataCentro = this.navParams.data;

  if(this.dataCentro.tipo == 1 ){

    this.readOnly = true;
    this.rate.servicio = this.dataCentro.servicio;
    this.rate.staff = this.dataCentro.staff;
    this.rate.precio = this.dataCentro.precio;
    this.rate.limpieza = this.dataCentro.limpieza;
    this.rate.ambiente = this.dataCentro.ambiente;
    this.comentario =   this.dataCentro.comentario;
    
  }
  else{
    this.readOnly=false;
  }

    console.log('ionViewDidLoad CalificarPage');



        this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.dataUser = data;

      }
      else{
      console.log('error');

      } 
      
      
     });


  }



setLoadingText=(text:string,total:string,inc:string ) =>{
  const elem = document.querySelector("div.itemCa");
  if(elem) elem.innerHTML = text +' / '+(total);

  const elem2 = document.querySelector("span.porcenCrec");
  if(elem2) elem2.style.width = inc+'%';

}


goAnimacion2 = (puntosV,totalV,puntosActual) => {
console.log(puntosV,totalV,puntosActual);
    var puntos = puntosV;
    var totall=totalV;
    var expUserM = puntosActual;

    var exp2Cont = 0;
    var valorInc = (puntosActual*100)/1500;
    var tiempo = 3000/(puntos/1); 
    console.log(tiempo);



      this.presentAlert2(`
      <div class="meter">
      <span class='porcenCrec' style="width:`+valorInc+`%;"><span class="progress2"></span></span>
      </div>

<div class=" itemCa">
 
</div>

<div class="floating itemFlo">
  + `+puntos+` exp
</div>

      <div class="leyendaAlert">

      <img  style='display: flex;' src="assets/imgs/complete.png">

      <span style='display: flex;'>
      Gracias por valorar! Has ganado `+puntos+` de experiencia
      </span>

      </div>`);


    let interval = setInterval(()=>{

  puntos-=1;
  //expUserM+=1;
  expUserM = (expUserM + 1)%1500
  exp2Cont++;
  //this.zone.run(()=>{   valorInc = parseInt(((puntosActual+exp2Cont)%1500)*100/1500) });
  valorInc = parseInt(((puntosActual+exp2Cont)%1500)*100/1500)
 

  this.setLoadingText(expUserM.toString(),totall.toString(), valorInc.toString());

  if(puntos <= 0) clearInterval(interval);
},tiempo)



}





  reintentarAlert(funcionEnviar){

    var mensaje = `<div>  
                      <p>No hemos podido conectar. 
                      Verifica tu conexión a Internet para continuar</p>
                      
                   <div>`;
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje),
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
/*
  let alert = this.alertCtrl.create({
    title: 'Evaluacion agregada',
    subTitle: 'La evaluacion ha sido agregada',
    buttons: ['Cerrar']
  });
  alert.present();
*/


    this.goAnimacion2(data.puntosGanados,data.dataUser[0].appexp,this.userDataProfile.exp);

    this.events.publish('userCreated', data.dataUser[0]);
  

}


    presentAlert2(mensaje) {
    let alert = this.alertCtrl.create({
     
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje)
    });
    alert.present();
  }



  agregar(){

 let loading = this.loadingCtrl.create({content : "Cargando ..."});
    loading.present();


 var cantidad=0;
 var acumulado =0;

 Object.keys(this.rate).forEach( (key) => {

 	acumulado += parseInt(this.rate[key]);
 	cantidad += 1;


});
  
	var dataE =  this.rate;
  dataE.idEvaluacionCentro=this.dataCentro.idEvaluacionCentro;
  dataE.comentario=this.comentario;
   dataE.idCliente=this.dataUser.idCliente;
  dataE.evaluacion=parseInt(acumulado/cantidad);


  console.log(dataE);

          this.apiProvider.agregarOpinion(dataE)
          .then(data => {

          loading.dismiss();

          console.log(data);
          if(data && data.dataI.affectedRows>0){
          
           this.goAnimacion2(data.dataUser[0].puntosG,data.dataUser[0].appexp,(data.dataUser[0].exp-data.dataUser[0].puntosG));
           this.events.publish('userCreated', data.dataUser[0]);

          //console.log('borrada');
        //this.navCtrl.pop();
             this.navCtrl.setRoot('OpinionesPage');
          }
          else{
          console.log('Ha ocurrido un error');
          this.reintentarAlert(this.agregar.bind(this));
          }


          });



  


  }
}
