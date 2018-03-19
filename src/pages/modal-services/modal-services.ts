import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public events: Events, private http: Http ) {



        let localData = http.get('assets/information.json').map(res => res.json().items);
      
    localData.subscribe(data => {
      this.information = data;
        this.information[0].open=true;
          this.information[0].children[0].selected=true;

           this.information[1].open=true;

           this.information[1].children[1].selected=true;
    })




  }



public closeModal(){
 	this.events.publish('modalServices');
    this.viewCtrl.dismiss();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServicesPage');
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
