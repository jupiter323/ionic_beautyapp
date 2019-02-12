import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core'; 
import { Select } from 'ionic-angular';


/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})


export class InicioPage {

 @ViewChild(Slides) slides: Slides;
 @ViewChild('select5') select5: Select;
  @ViewChild('select66') select66: Select;
    @ViewChild('select77') select77: Select;

inicioSesion=false;
optionSubcategorias=[];
optionSubcategorias3=[];
nombreCat2:any;
subcategoriasT={};
  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,  private sanitizer: DomSanitizer, public alertCtrl: AlertController, public loadingController:LoadingController, public events: Events,public modalCtrl: ModalController,public zone: NgZone,public cdr: ChangeDetectorRef) {


  this.categorias = [];
  this.expUser = 254;

  events.subscribe('loginOK', () => {

  setTimeout(() => {   
    this.zone.run(() => { 

    // user and time are the same arguments passed in `events.publish(user, time)`
          this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.inicioSesion=false;
      this.userDataProfile=data;



      }
      else{
      this.inicioSesion=true;
      } 
      
      
     });


     }); 
}, 500);




     
  });



this.selectOptions = {
  title: 'Selecciona una Subcategoria',
  cssClass:'select-alertless'
};


this.selectOptions2 = {
  title: 'Selecciona una Categoria',
  cssClass:'select-alertless'
};







  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad InicioPage');

      this.apiProvider.categoriasHome()
      .then(data => {
       console.log(data);
       if(data){
        this.categorias = data['categorias'] || [];

        this.categorias.push({
        appIcono: "",
estado: 1,
fechaCreacion: "2018-04-23T08:30:46.000Z",
idCategoria: 0,
idFoto: "uploads/imageU-1540846491613.png",
idImagenIcono: "Ofertas.png",
nombre: "Ofertas"});

        this.categorias.push({
        appIcono: "",
estado: 1,
fechaCreacion: "2018-04-23T08:30:46.000Z",
idCategoria: 0,
idFoto: "uploads/imageU-1540846550671.jpg",
idImagenIcono: "Paquetes.png",
nombre: "Paquetes"});


        this.subcategoriasT = data['subcategorias'] || {};
       }
       else{

        console.log('Ha ocurrido un error');

      this.reintentarAlert(this.ionViewDidLoad.bind(this));

       }
       
      });



    this.apiProvider.verificarLogin()
    .then(data => { 
      if(data){

      this.apiProvider.getCitaPendientesN({idCliente:data.idCliente})
      .then(dataCall => {
       console.log(dataCall);
       if(dataCall && dataCall.citas && dataCall.citas.length>0){
               this.navCtrl.push('DetalleReservaPage', {idCita:dataCall.citas[0].idCita});
       }

       if(dataCall && dataCall.animaciones && dataCall.animaciones.length>0){
             
             //if(dataCall.animaciones[0].idCC>0){
             if(false){
              this.apiProvider.quitarAnimacion({idCliente:data.idCliente})
                .then(dataCalls => {

                if(dataCalls.data[0] && (dataCalls.data[0].idCliente  > 0)){
                this.events.publish('userCreated', dataCalls.data[0]);
                };

                let profileModal = this.modalCtrl.create('CongratsPage',{'idCuponCliente':dataCall.animaciones[0].idCC},{
                enterAnimation: 'modal-scale-up-enter',
                leaveAnimation: 'modal-scale-up-leave'
                });
                profileModal.present();

                });



             }
             else{

                this.apiProvider.quitarAnimacion({idCliente:data.idCliente})
                .then(dataCalls => {

                if(dataCalls.data[0] && (dataCalls.data[0].idCliente  > 0)){
                this.events.publish('userCreated', dataCalls.data[0]);
                };

                this.goAnimacion2(dataCall.animaciones[0].ga,dataCall.animaciones[0].ge,dataCall.animaciones[0].gi,dataCall.animaciones[0].idCC);

                });
              
              }
               this.navCtrl.push('OpinionesPage');
       }


      });
      }
      else{
      console.log('no pendientes');
      } 
     });




  }


    ionViewDidEnter() {
    
    
 this.slides.autoplayDisableOnInteraction = false;
        this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.inicioSesion=false;
      }
      else{
      this.inicioSesion=true;
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




goAnimacion2 = (puntosV,totalV,puntosActual,idcc) => {

console.log(puntosV,totalV,puntosActual);
    var puntos = puntosV;
    var totall=totalV;
    var expUserM = puntosActual;

    var exp2Cont = 0;
    var valorInc = (puntosActual*100)/1500;
    var tiempo = 3000/(puntos/1); 
    console.log(tiempo);



      var mensaje = `<div class="meter">
      <span class='porcenCrec' style="width:`+valorInc+`% ;"><span class="progress2"></span></span>
      </div>

<div class=" itemCa">
 
</div>

<div class="floating itemFlo">
  + `+puntos+` exp
</div>

      <div class="leyendaAlert">

      <img  style='display: flex;' src="assets/imgs/complete.png">

      <span style='display: flex;'>
      Tu cita fue completada con éxito, has ganado `+puntos+` de experiencia
      </span>

      </div>`;

    let alert = this.alertCtrl.create({
     
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje)
    });
    alert.present();


    let interval = setInterval(()=>{

  puntos-=1;
  //expUserM+=1;
  expUserM = (expUserM + 1)%1500
  exp2Cont++;
  //this.zone.run(()=>{   valorInc = parseInt(((puntosActual+exp2Cont)%1500)*100/1500) });
  valorInc = parseInt(((puntosActual+exp2Cont)%1500)*100/1500)
 //console.log(valorInc.toString());

  this.setLoadingText(expUserM.toString(),totall.toString(), valorInc.toString());

  if(puntos <= 0) {
  clearInterval(interval);

  if(idcc>0){
  alert.dismiss();
                  let profileModal = this.modalCtrl.create('CongratsPage',{'idCuponCliente':idcc},{
                enterAnimation: 'modal-scale-up-enter',
                leaveAnimation: 'modal-scale-up-leave'
                });
                profileModal.present();

                }
  }
  

},tiempo);


}



setLoadingText=(text:string,total:string,inc:string ) =>{
  const elem = document.querySelector("div.itemCa");
  if(elem) elem.innerHTML = text +' / '+(total);

  const elem2 = document.querySelector("span.porcenCrec");
  if(elem2) elem2.style.width = inc+'%';

/*
  var el = document.querySelector('div');

el.style.backgroundColor = 'green';
*/
}


/*
goFF(){
  

   let profileModal = this.modalCtrl.create('LogindPage',{'total':120});
   profileModal.present();


}
*/
goAnimacion = () => {

   let profileModal = this.modalCtrl.create('CongratsPage',{'idCuponCliente':56},{
    enterAnimation: 'modal-scale-up-enter',
    leaveAnimation: 'modal-scale-up-leave'
   });
   profileModal.present();
}
/*
<div class=" itemCa">
 

</div>

*/
/*
goAnimacion2 = () => {
    var puntos = 120;
    var totall=1500;
    var tiempo = 4000/(puntos/3); 
    console.log(tiempo);
    var expUserM = 140;


      this.presentAlert2(`
      <div class="meter">
      <span style="width:`+(((puntos+expUserM)*100)/totall)+`%;"><span class="progress"></span></span>
      </div>

<div class=" itemCa">
 
</div>

<div class="floating itemFlo">
  + `+puntos+` exp
</div>

      <div class="leyendaAlert">

      <img  style='display: flex;' src="assets/imgs/complete.png">

      <span style='display: flex;'>
      Tu cita fue completada con éxito, has ganado `+puntos+` de experiencia
      </span>

      </div>`);


    let interval = setInterval(()=>{

  puntos-=3;
  expUserM+=3;

  this.setLoadingText(expUserM,totall);

  if(puntos == 0) clearInterval(interval);
},tiempo)



}

*/
    presentAlert2(mensaje) {
    let alert = this.alertCtrl.create({
     
      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje)
    });
    alert.present();
  }

printOption = (ee) => {

var eeArra = [];
eeArra.push(parseInt(ee));
console.log(this.nombreCat2);
  console.log(ee);
  if(ee.length<1){
  return true;
  }
  else{
    var fs = {'nombre':this.seleccionCategoria,'sub':eeArra,'nombreCat2':this.nombreCat2};
  console.log(fs);
  this.navCtrl.push('ListaServiciosPage', fs);
  }

}



printOption2 = (ee) => {
console.log(ee);

var subCatParam = this.subcategoriasT[ee].map((item)=>{return item.idSubcategoria});
console.log(subCatParam);
this.navCtrl.push('MapaPage',{'idCategoria':ee,'idSubcategoriaS':subCatParam});
/*
  console.log(ee);
  if(ee.length<1){
  return true;
  }
  else{
    var fs = {'nombre':this.seleccionCategoria,'sub':ee,'nombreCat2':this.nombreCat2};
  console.log(fs);
  this.navCtrl.push('ListaServiciosPage', fs);
  }
*/
}





    goServicio(nombreServicio,nombreCat){
if(nombreServicio == 0){
console.log('nada');  
if(nombreCat == 'Paquetes'){
  this.navCtrl.push('PaquetesPage');
}
if(nombreCat == 'Ofertas'){
  this.navCtrl.push('OfertasPage');
}
}
else{
      console.log(nombreServicio);

      this.nombreCat2=nombreCat;
      this.seleccionCategoria=nombreServicio;
     this.optionSubcategorias = this.subcategoriasT[nombreServicio];
     this.option2=null;
     this.cdr.detectChanges();
      this.select5.open();
}

  }


goServicio3(ee){
  
var nombreD =  this.categorias.filter(word => word.idCategoria == parseInt(this.seleccionCategoria3))[0].nombre;
var nombreSD =  this.optionSubcategorias3.filter(word => word.idSubcategoria == parseInt(ee))[0].nombre;

var sdd = {'idCategoria':this.seleccionCategoria3,'idSubcategoriaS':[ee],'nombreCat':nombreD,
'nombreSub':nombreSD};
console.log(this.categorias);
console.log(sdd);
this.navCtrl.push('MapaPage',sdd);
}

borrarNGM(){
 
  this.option3=null;
 this.cdr.detectChanges();
 
}


    goServicio2(idCategoriasS){

     // this.nombreCat3=nombreCat;
      this.seleccionCategoria3=idCategoriasS;


     // this.zone.run(()=>{  

 this.optionSubcategorias3 = this.subcategoriasT[idCategoriasS];
  //this.borrarNGM();  
    this.option3=null;
 this.cdr.detectChanges();


 console.log(this.subcategoriasT);
  console.log(this.optionSubcategorias3);
console.log(this.option3);
 this.select77.open();
 //}); 

    
     //this.cdr.detectChanges();

     // 
  }



      goServicioMapa(){



this.select66.open();


  }




    goMapa(){
//console.log(nombreServicio);
  //this.navCtrl.setRoot('MapaPage');
this.navCtrl.push('MapaPage');
  }

      openMenu(){
   let profileModal = this.modalCtrl.create('LoginPage');
   profileModal.present();

  }

  


setDefaultPic(nombre) {
console.log(nombre);
  return  "assets/imgs/"+nombre;
}





}
