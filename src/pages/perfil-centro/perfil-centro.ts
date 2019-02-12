import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'
 
import { DomSanitizer } from '@angular/platform-browser';

import { ModalController } from 'ionic-angular';



import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil-centro',
  templateUrl: 'perfil-centro.html'
})
export class PerfilCentroPage {
information: any[];
horarioActivo=[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private DomSanitizer: DomSanitizer,public navParams: NavParams, private http: Http, public modalCtrl:ModalController,public apiProvider: ApiProvider, public loadingController:LoadingController, public events: Events, public zone: NgZone) {

      let localData = http.get('assets/information.json').map(res => res.json().items);
      this.centroInfo = [];
      this.cuponActivo = [];
      this.idUsuario=0;
      this.arraySelected=[];
      this.dataCentro={};
      this.favorito = false;
      /*
      events.subscribe('actualizarData', (data, cambiarA) => {

     
          this.information.forEach((elementw, index) => {
             let index = elementw.children.findIndex(i => i.idServicio === data);
            if (index > -1) {
            elementw.children[index].selected=cambiarA;
            }
          });
     

        console.log(this.information);
  });
*/

    //localData.subscribe(data => {this.information = data;console.log(this.information);this.information[0].open=true;})


  }

  ionViewDidLoad() {  
  
  this.section = "one";

      this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.dataUser = data;
      this.idUsuario = data.idCliente;
      this.getCentroInfo(this.navParams.get('idCentro'));
      }
      else{
      console.log('error');
      this.idUsuario=0;
      this.getCentroInfo(this.navParams.get('idCentro'));
      } 
      
     });



    console.log('ionViewDidoad PerfilCentroPage');
    //this.navParams.get('nombre')
    



  }

ionViewDidEnter(){


    this.apiProvider.vaciarCarrito()
      .then(data => {
      console.log(data);
        //  this.serviciosAll = data;

      });

  
}
getHorarioDia(dia){
  var ret='';
  var result = this.horarioActivo.filter(word => word.diaSemana == dia)[0];
  console.log(result);
  if(result){
  if(result.estado==1){
  ret = ''+result.horaAbrir+' - '+result.horaCerrar;
  }
  else{ret = 'CERRADO'}
  
  }
  else{ret = 'CERRADO'}

  return ret;
}

  getCentroInfo(idCentro){

   let loading = this.loadingController.create({content : "Cargando...",   cssClass: "my-loading"});
   loading.present();


  var d = new Date();
var numDia = d.getDay();
  if(numDia==6){numDia=0;}
  else{numDia=numDia+1;}

   let dataPost = {idCentro:idCentro, idCliente:this.idUsuario,numDia:numDia};
   console.log(dataPost);
   this.apiProvider.getCentroInfo(dataPost)
      .then(data => {
    

        if(data){
      console.log(data);          
      let nombreCategoria = (Object.keys(data['servicios']));
      let serviArr = (Object.values(data['servicios']));
      this.comentarios = data['comentarios'];
      this.cuponActivo = data['cupon'];
        this.horarioActivo = data['horario'];

/*
      let itemDate = serviArr.map((i, index) => {
      console.log(nombreCategoria[index]);
        let item = {"name":nombreCategoria[index], "children": i, "open": i[0].idCategoria == this.navParams.get('idServicioSeleccionado')};
        return item;});
*/
        let itemDate = [];

        serviArr.forEach((i, index) =>{

        //idServReal

        if(this.navParams.get('idServReal') && this.navParams.get('idServReal')>0){
        var first = this.navParams.get('idServReal');
        i.sort(function(x,y){ return x.idServicio == first ? -1 : y.idServicio == first ? 1 : 0; });
        }
        let item = {"name":nombreCategoria[index], "children": i, "open": i[0].idCategoria == this.navParams.get('idServicioSeleccionado')};

        if(item.open){
        itemDate.unshift(item);
        }
        else{
        itemDate.push(item);
        }


        });



        console.log(itemDate);

        //actualiuza ngzone

      this.zone.run(()=>{ 
      //this.imageFileName = imageData;

              this.information = itemDate;
        this.dataCentro = data['info'][0];
        this.favorito = this.dataCentro.favorito > 0 ? true : false;

        
       }); 



       // this.centroInfo = data || [];


       loading.dismiss();

       }
       else{
       loading.dismiss();
       console.log('Ha ocurrido un error');
            this.reintentarAlert(this.ionViewDidLoad.bind(this));


       }

       
      });


  }



  getPrecioDescuento(item){

    var retorno = 0;
    if(this.cuponActivo.length > 0){

      var descuento = this.cuponActivo[0].porcentajeDescuento || 0;
      var precio = item.precio;

      if(this.cuponActivo[0].tipo == "2"){
        if(this.cuponActivo[0].tipoDescuento == "1"){
          retorno = precio - (precio*(descuento/100));
        }
        if(this.cuponActivo[0].tipoDescuento == "2"){
        retorno = precio - descuento;
        }
        

      }
      

        if(this.cuponActivo[0].tipo == "1"){

        console.log(this.cuponActivo[0].serviciosCupon.split(','));
        var arrayCupones = this.cuponActivo[0].serviciosCupon.split(',').includes(String(item.idServicio));

        if(arrayCupones){

          if(this.cuponActivo[0].tipoDescuento == "1"){
            retorno = precio - (precio*(descuento/100));
          }
          if(this.cuponActivo[0].tipoDescuento == "2"){
          retorno = precio - descuento;
          }

        }
        else{
        retorno = precio;
        }

        

      }



      if(item.oferta){
        if(retorno > item.oferta){
        retorno = item.oferta;
        }
      }
    }
    else{
      if(item.oferta){
        retorno = item.oferta;
      }
      else{retorno = item.precio;}
    }
    console.log(retorno);
    return retorno % 1 != 0 ? retorno.toFixed(2) : retorno;
    //return retorno.toFixed(2);
    //return retorno;
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




comoLlegar(lat,lon){
  console.log(this.dataCentro.latitud);
  launchnavigator.navigate([this.dataCentro.latitud, this.dataCentro.longitud]);

}
llamar(){

  if(this.dataCentro.telefono){
  let num = this.dataCentro.telefono;

  window.plugins.CallNumber.callNumber(suc => {console.log(suc)}, err => {console.log(err)}, num, true);


  }


  

}



   agregarFavorito() {
    
   if(this.idUsuario > 0){
    //cambiarFavorito
    let dataE = {idCentro:this.dataCentro.idCentro,idCliente:this.idUsuario};
    console.log(dataE);

    this.apiProvider.cambiarFavorito(dataE)
    .then(data => { 
      console.log(data);

      if(data.insertId>0){
      console.log(data);
      this.favorito = !this.favorito;
      }
      else{
      console.log('error');
      } 
      
     });
}
else{console.log('sessionnoiiniciada')}

  }



   toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
    console.log(this.information[i].children[j].open);
  }



  toggleSelect(i, j) {
      console.log(this.information[i].children[j]);
      this.information[i].children[j].precioFinal = this.getPrecioDescuento(this.information[i].children[j]);
      //console.log( this.information[i].children[j]);
      this.apiProvider.addProducto(this.information[i].children[j])
      .then(data => {
         // console.log(data);
          this.goReserva(this.information[i].children[j].idCategoria);
      });

    //console.log(this.arraySelected);
  }



  toggleSelect22(i, j) {

            //this.goReserva(this.information[i].children[j].idCategoria);

      console.log( this.information[i].children[j]);
      this.information[i].children[j].precioFinal = this.getPrecioDescuento(this.information[i].children[j]);

      if(this.information[i].children[j].selected == true){


        this.apiProvider.sacarProducto(this.information[i].children[j].idServicio)
      .then(data => {
          console.log(data);
          this.information[i].children[j].selected = false;
      });


      }
      else{

        this.apiProvider.addProducto(this.information[i].children[j])
      .then(data => {
          console.log(data);
          this.information[i].children[j].selected = true;
      });

      }




    console.log(this.arraySelected);
  }



getCuponData(){

var retorno = null;

  if(this.cuponActivo.length>0){

    return this.cuponActivo[0].idCuponCliente;
  }
console.log('CUPON:'+retorno);
return retorno;
  
}


  goReserva(categoria) {
  //servicios: this.arraySelected

  let dataE = {'servicios':this.arraySelected, 'idCentro':this.navParams.get('idCentro'), centro:this.dataCentro, 'cupon': this.getCuponData(), idCategoria:categoria};
  console.log(dataE);
  this.navCtrl.push('ReservaPage', dataE);

    // this.navCtrl.push('ReservaPage');
  }





}
