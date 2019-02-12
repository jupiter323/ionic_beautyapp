import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the CongratsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-congrats',
  templateUrl: 'congrats.html',
})
export class CongratsPage {


  constructor( public viewCtrl : ViewController,public apiProvider: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
this.cuponP={};
  this.st1 = true;
  this.st2 = false;
  this.st3 = false;
 this.st4 = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratsPage');
    // this.navParams.get('idCuponCliente');
        let dataE = {idCuponCliente:this.navParams.get('idCuponCliente')};
      console.log(dataE);
        this.apiProvider.getCuponPremio(dataE)
      .then(data => {
       console.log(data);
              if(data){

         this.cuponP = data[0] || {};
       }
       else{console.log('Ha ocurrido un error');}

       
      });
  }


animacion1(){
	  this.st1 = false;
  this.st2 = true;
    this.st4 = true;
}


public closeModals(){
    this.viewCtrl.dismiss();
}



}
