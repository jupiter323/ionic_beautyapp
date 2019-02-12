import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

information = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');


     this.information = [{nombre:'¿Qué es Yourbeauty?',id:1,respuesta:'Yourbeauty es una aplicación gratuita que te permite reservar servicios de belleza y bienestar en los mejores  centros en la ciudad de Panamá.',open:false },

                        {nombre:'¿Qué servicios ofrecen los centros?',id:2,respuesta:'Los servicios se clasifican por categoría, y en ellas se despliegan los servicios relacionados. También puedes  buscar por palabra clave o según necesidad  en la opción de filtros.',open:false},

                        {nombre:'¿Cómo se reserva?',id:3,respuesta:'Selecciona el servicio, el día, hora y el staff deseado.  Una vez confirmes reserva, se enviará solicitud al centro. Podrás consultar en la pestaña  “Reservaciones” el estado y todos los detalles relacionados con la reservación. <br><br>  En caso centro no confirme, en la misma reserva te dan opción de contactarlo directamente. Así mismo, puedes reprogramar o cancelar la cita según tu necesidad.',open:false},

                        {nombre:'¿En qué momento se efectúa el pago?',id:4,respuesta:'El precio que indica en el  servicio seleccionado deberá abonarse directamente al centro, éste precio no incluye ITBMS. Una vez completado el servicio (efectúas pago en el centro) deben confirmar el servicio completado para puedas acumular puntos en tu “Experiencie Line”.',open:false},

                        {nombre:'¿Cómo guardo un centro como favorito?',id:5,respuesta:'Guarda el centro que has indicado como favorito para que lo tengas en cuenta en futuras reservaciones. Se indica favorito en el perfil del centro donde aparece foto principal.',open:false},

                        {nombre:'¿Cómo me beneficio de un cupón o regalo?',id:6,respuesta:'Ingresa el código del cupón y benefíciate de los descuentos relacionados con el mismo. Debes tener en cuenta la fecha de expiración porque vencido plazo deja de estar en uso',open:false},

                        {nombre:'¿Porqué las opiniones se clasifican en pendientes y agregadas?',id:7,respuesta:'Las pendientes son las reservaciones que se han completado y no has compartido tu experiencia, debes calificar y dar tu opinión para acumular puntos en tu “Experiencie Line”. <br><br>  Las agregadas son las opiniones que has compartido  después de una reserva completada, por la cual ya has acumulado los  puntos en tu “Experiencie Line”.  Quedan como historial de tu experiencia.',open:false},

                        {nombre:'¿Qué servicios están en ofertas y/o que paquetes ofrecen?',id:8,respuesta:'Selecciona en la pantalla principal o desde el menú la opción deseada y verás que servicios ofrecen el descuento.',open:false},


                        {nombre:'¿Qué datos se muestran en mi cuenta?',id:9,respuesta:'Figuran tus datos personales y tu “Experience Line”, barra  de experiencia donde acumulas los puntos. <br><br> <b>Acumulas puntos de la siguiente manera:</b> <ul><li>Cada 1 dólar sumas 1 punto</li><li>Cada opinión que realices sumas 5 puntos</li><li>Por compartir App con tus amigos sumas 3 puntos</li></ul><br> Cuando  llegues a 1500 puntos… ¡FELICITACIONES! Habrás completado tu “Experience Line”  obtendrás tu cupón para que lo puedas disfrutar. Los puntos no caducan.',open:false}];

                         //this.fechaSeleccionada = new Date(Date.now());



  


  }

  toggleSection(i) {

    this.information[i].open = !this.information[i].open;

    this.information.forEach((item,index)=>{

      if(index!==i){
        this.information[index].open=false;
      }

    });

  }
 






}
