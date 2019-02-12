import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservaHechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva-hecha',
  templateUrl: 'reserva-hecha.html',
})
export class ReservaHechaPage {

             textoMensaje :any;
                icono :any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaHechaPage');


               if( window.plugins && window.plugins.NativeAudio){

                  window.plugins.NativeAudio.preloadComplex( 'bepapp', 'assets/bepapp.mp3', 1, 1, 0, (msg)=>{

                  
                  window.plugins.NativeAudio.play('bepapp', () => {

                  setTimeout( () => {

                   window.plugins.NativeAudio.unload('bepapp');

                  }, 2000);
                 


                  });
                  }, (msg)=>{
                  console.log( 'error: ' + msg );
                  });


               console.log('playsonido');
                                }

            if(this.navParams.get('confirmada') == 1){

                this.textoMensaje = 'Listo! Reserva confirmada!';
                this.icono = 'complete.png';

            }
            else{
                this.textoMensaje = 'Tu reserva se está gestionando! En breve, te confirmamos!';
                this.icono = 'complete2.png';
            }

  }

 

    goPagina(pagina) {

   // this.navCtrl.setRoot(pagina);
   this.navCtrl.setRoot(pagina, {idCita:this.navParams.get('idCita'), 'startF':true});
   //this.navCtrl.push('PerfilCentroPage');
  }

}
