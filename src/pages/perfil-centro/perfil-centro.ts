import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'
 

@IonicPage()
@Component({
  selector: 'page-perfil-centro',
  templateUrl: 'perfil-centro.html'
})
export class PerfilCentroPage {
information: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

      let localData = http.get('assets/information.json').map(res => res.json().items);
      
    localData.subscribe(data => {
      this.information = data;
      this.information[0].open=true;
    })


  }

  ionViewDidLoad() {  
  this.section = "one";

    console.log('ionViewDidoad PerfilCentroPage');
  }

   toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
    console.log(this.information[i].children[j].open);
  }



  toggleSelect(i, j) {
    this.information[i].children[j].selected = !this.information[i].children[j].selected;
  }



  goReserva() {
     this.navCtrl.push('ReservaPage');
  }





}
