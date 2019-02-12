import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the DemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html',
})


export class DemoPage {

  constructor(public navCtrl: NavController,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemoPage');
  }

    siguienteSlide(){
    console.log('dasd');
   this.slider.slideNext();
  }
 


    iniciarApp(){
    this.navCtrl.setRoot('InicioPage');
  }
 



}
