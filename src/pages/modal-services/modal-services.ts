import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'

/**
 * Generated class for the ModalServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-services',
  templateUrl: 'modal-services.html',
})
export class ModalServicesPage {
information: any[];
serviciosCategoria: any[];
categoriasServicio: any[];
cuponActivo: any[];
dataUser={};
idUsuario = 0;



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public events: Events, private http: Http, public apiProvider: ApiProvider ) {


    /*
            let localData = http.get('assets/information.json').map(res => res.json().items);
          
        localData.subscribe(data => {
          this.information = data;
            this.information[0].open=true;
              this.information[0].children[0].selected=true;

               this.information[1].open=true;

               this.information[1].children[1].selected=true;
        })

    */


  }



public closeModal(){
 //	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServicesPage');


      this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){


      this.idUsuario = data.idCliente;
      this.getServiciosCategoria();
      }
      else{
      console.log('error');
      this.idUsuario=0;
      this.getServiciosCategoria();
      } 
      
     });



  }
/*
  ionViewDidEnter(){
  this.getServiciosCategoria();
  }
*/



  getServiciosCategoria(){

    var dataE={idCategoria:this.navParams.get('idCategoria'),
                idCentro:this.navParams.get('idCentro'),
                idCliente: this.idUsuario};

          this.apiProvider.getServiciosCategoria(dataE).then(data => {
          console.log(data);
          this.categoriasServicio = Object.values(data['categorias']);

          

          this.serviciosCategoria=data['servicios'];
          this.cuponActivo = data['cupon'];
          console.log(this.categoriasServicio);
          });
    }


addCarrito(child){
  
      child.precioFinal = this.getPrecioDescuento(child);
      this.apiProvider.addProducto(child)
      .then(data => {
          console.log(data);
          this.events.publish('actualizarDataServicios');
          this.viewCtrl.dismiss();
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

        if(this.cuponActivo[0].serviciosCupon.split(',').includes(String(item.idServicio))){

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

    return retorno % 1 != 0 ? retorno.toFixed(2) : retorno;
    //return retorno;
  }


   toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }


toggleSelect(i, j) {
    this.information[i].children[j].selected = !this.information[i].children[j].selected;
  }



}
