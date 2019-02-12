import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';


import { NgZone } from '@angular/core';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  swiper: any;
  @ViewChild('slider') slider: Slides;

  rootPage: any = '';
  loader: any;
  menuActivo = false;
  authForm: FormGroup;
  porcenBarra = 0;
  pages: Array<{ title: string, component: any }>;


  constructor(public cdr: ChangeDetectorRef, public platform: Platform, public statusBar: StatusBar, public alertCtrl: AlertController, private sanitizer: DomSanitizer, public menuCtrl: MenuController, public splashScreen: SplashScreen, public formBuilder: FormBuilder, public events: Events, public loadingCtrl: LoadingController, public storage: Storage, public modalCtrl: ModalController, public apiProvider: ApiProvider, public zone: NgZone) {
    this.initializeApp();
    this.presentLoading();

    this.loading2 = this.loadingCtrl.create({ content: "Ingresando" });
    this.events.subscribe('userCreated', (user) => {
      setTimeout(() => {
        this.zone.run(() => {

          (<any>this).userDataProfile = user;
          this.menuActivo = true;
          this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';


        });
      }, 500);



    });


    this.events.subscribe('loginRemoto', (data) => {

      setTimeout(() => {
        data.username = data.email;
        console.log(data);
        this.doLogin(data);
      }, 100);
    });


    this.events.subscribe('userLogout', () => {
      this.userDataProfile = false;
      this.storage.set(`usr_tok_by`, false);
      this.menuActivo = false;
      this.nav.setRoot('InicioPage');
      //console.log(user);
    });

    this.events.subscribe('userCH', () => {


      setTimeout(() => {
        this.apiProvider.verificarLogin()
          .then(data => {
            if (data) {

              this.zone.run(() => {
                //setTimeout(() => { 

                this.userDataProfile = data;
                this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';
                console.log(this.porcenBarra);
                this.menuActivo = true;

                //  },0) 
              });


              //this.cdr.detectChanges();

            }
            else {
              this.menuActivo = false;
            }
          });

      }, 500);
    });






    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];


    this.authForm = formBuilder.group({
      // username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
      username: ['', Validators.compose([Validators.required])],

      password: ['', Validators.compose([Validators.required])]
    });




  }

  /*
  setLoadingText=(text:string,total:string ) =>{
    const elem = document.querySelector("div.itemCa");
    if(elem) elem.innerHTML = text +' / '+(total);
  
  }
  
  */
  setLoadingText = (text: string, total: string, inc: string) => {
    const elem = document.querySelector("div.itemCa");
    if (elem) elem.innerHTML = text + ' / ' + (total);

    const elem2 = document.querySelector("span.porcenCrec");
    if (elem2) elem2.style.width = inc + '%';

    /*
      var el = document.querySelector('div');
    
    el.style.backgroundColor = 'green';
    */
  }




  openDerechos() {

    window.open("https://www.yourbeauty.com.pa/terminos/", '_system', 'location=yes');
  }

  presentAlert(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Cerrar']
    });
    alert.present();
  }
  presentAlert2(mensaje) {
    let alert = this.alertCtrl.create({

      subTitle: this.sanitizer.bypassSecurityTrustHtml(mensaje)
    });
    alert.present();
  }



  goAnimacion2 = (puntosV, totalV, puntosActual) => {
    console.log(puntosV, totalV, puntosActual);
    var puntos = puntosV;
    var totall = totalV;
    var expUserM = puntosActual;

    var exp2Cont = 0;
    var valorInc = (puntosActual * 100) / 1500;
    var tiempo = 3000 / (puntos / 1);
    console.log(tiempo);



    this.presentAlert2(`
      <div class="meter">
      <span class='porcenCrec' style="width:`+ valorInc + `%;"><span class="progress2"></span></span>
      </div>

<div class=" itemCa">
 
</div>

<div class="floating itemFlo">
  + `+ puntos + ` exp
</div>

      <div class="leyendaAlert">

      <img  style='display: flex;' src="assets/imgs/complete.png">

      <span style='display: flex;'>
      Gracias por compartir! Has ganado `+ puntos + ` de experiencia
      </span>

      </div>`);

    let interval = setInterval(() => {

      puntos -= 1;
      //expUserM+=1;
      expUserM = (expUserM + 1) % 1500
      exp2Cont++;
      //this.zone.run(()=>{   valorInc = parseInt(((puntosActual+exp2Cont)%1500)*100/1500) });
      valorInc = parseInt(((puntosActual + exp2Cont) % 1500) * 100 / 1500)


      this.setLoadingText(expUserM.toString(), totall.toString(), valorInc.toString());

      if (puntos <= 0) clearInterval(interval);
    }, tiempo)



  }


  /*
  goAnimacion2 = (puntosV,totalV,puntosActual) => {
  console.log(puntosV,totalV,puntosActual);
      var puntos = puntosV;
      var totall=totalV;
      var expUserM = puntosActual;
  
      var tiempo = 3000/(puntos/1); 
      console.log(tiempo);
  
  
  
        this.presentAlert2(`
        <div class="meter">
        <span style="width:`+((((puntos+expUserM)%1500)*100)/totall)+`%;"><span class="progress"></span></span>
        </div>
  
  <div class=" itemCa">
   
  </div>
  
  
  <div class="floating itemFlo">
    + `+(puntos%1500)+` exp
  </div>
  
        <div class="leyendaAlert">
  
        <img  style='display: flex;' src="assets/imgs/complete.png">
  
        <span style='display: flex;'>
        Has compartido el Yourbeauty con exito, has ganado `+puntos+` de experiencia
        </span>
  
        </div>`);
  
  
      let interval = setInterval(()=>{
  
    puntos-=1;
    expUserM = ((expUserM+1)%1500);
    console.log(expUserM);
    //var stringEnv = expUserM % 1500;
  
    this.setLoadingText(expUserM.toString(),totall.toString());
  
    if(puntos <= 0) clearInterval(interval);
  },tiempo)
  
  
  
  }
  */
  registrarDevice(data) {
    console.log('regsustr');
    console.log(data);
    this.storage.set(`pushKeyBY`, data.registrationId);

  }


  doLogin(data) {

    let loading = this.loadingCtrl.create({ content: "Verificando Credenciales..." });
    loading.present();




    this.apiProvider.doLoginApi(data)
      .then(data => {

        console.log(data);
        if (data.data[0] && (data.data[0].idCliente > 0)) {
          if (data.data[0].estado == 0) {
            console.log(data);
            //this.presentAlert('Activa tu cuenta','Debes verificar tu correo');
            this.menuCtrl.close();
            this.nav.push('VerificacionPage', data.data[0]);
          }
          else {
            console.log(data);
            this.storage.get('pushKeyBY').then((value) => {
              if (value) {
                console.log(value);
                var pushState = {
                  pushK: value,
                  device: device.platform,
                  deviceId: device.uuid,
                  login: Date.now(),
                  user: data.data[0].idCliente
                }
                console.log(pushState);
                this.apiProvider.addPush(pushState).then(data => {
                  console.log(data);
                });
              }

              //value;

            });



            this.storage.set(`usr_tok_by`, data.data[0]);
            this.events.publish('userCreated', data.data[0]);

            this.events.publish('loginOK');

            this.menuActivo = true;
            //this.closeModal();


          }
          loading.dismissAll();
        }
        else {
          loading.dismissAll();
          this.presentAlert('Ups!', 'Credenciales incorrectas');
        }

      });

  }



  onSubmit(data) {

    console.log(data);

  }



  initializeApp() {
    this.platform.ready().then(() => {
      //navigator.splashscreen.hide();
      //Keyboard.hideFormAccessoryBar(true);



      //navigator.splashscreen.hide();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();




      this.platform.registerBackButtonAction(() => {
        console.log('donothing');

      });


      this.apiProvider.verificarLogin()
        .then(data => {

          console.log(data);

          if (data) {


            this.userDataProfile = data;
            this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';
            console.log(this.porcenBarra);
            this.menuActivo = true;
          }
          else {
            this.menuActivo = false;
          }


        });



      /*  
       //BORRAR ESTAS 3 LINEAS 
 
       this.menuActivo = false;
      this.storage.set('introShownBY', false);
      this.loader.dismiss();
       // init demo verification
 */

      this.storage.get('introShownBY').then((result) => {
        console.log(result);
        if (result) {
          this.rootPage = 'InicioPage';
          console.log('d3');
        } else {
          this.rootPage = 'DemoPage';
          this.storage.set('introShownBY', true);
          console.log('5efd');
        }
        this.loader.dismiss();
      });

      // if(this.platform.is('android') || this.platform.is('ios')){


      //if(this.platform.is('android') || this.platform.is('ios')){
      if (false) {
        console.log('amhere1');
        //PUSH FUNCIONANDO
        var push = PushNotification.init({
          "android": {
            "senderID": "187646798187"
          },
          "ios": {
            "alert": "true",
            "badge": "true",
            "sound": "true"
          },
          "windows": {}
        });
        push.on('registration', data => this.registrarDevice(data));
        push.on('notification', (data) => {


          if (data.additionalData.tipoNoti == "2" || data.additionalData.tipoNoti == 2) {
            this.nav.setRoot('InicioPage');
            /*
                        var ga=Number(data.additionalData.puntosGanados) * 1;
                        var ge=Number(data.additionalData.totalExc)* 1;
                        var gi=Number(data.additionalData.puntosActual)* 1;
                        var idCC=Number(data.additionalData.idCC);
            
            
                        if(idCC>0){
            
                           let profileModal = this.modalCtrl.create('CongratsPage',{'idCuponCliente':idCC},{
                enterAnimation: 'modal-scale-up-enter',
                leaveAnimation: 'modal-scale-up-leave'
               });
               profileModal.present();
            
            
                        }
                        else{
            
                        this.goAnimacion2(ga,ge,gi);
            
                        }
                       
              
                         this.nav.push('OpinionesPage');
            */


          }

          if (data.additionalData.tipoNoti == "1" || data.additionalData.tipoNoti == 1) {

            var id = Number(data.additionalData.idCita);
            this.nav.push('DetalleReservaPage', { idCita: id });
            this.presentAlert(data.title, data.message);
          }

          if (data.additionalData.tipoNoti == "3" || data.additionalData.tipoNoti == 3) {

            var id = Number(data.additionalData.idCupon);
            this.nav.push('CuponesPage');
            this.presentAlert(data.title, data.message);
          }

          console.log(data);
        });
        push.on('error', function (e) {
          console.log(e.message);
          console.log(e);
        });

      }




      //End push 

    });

    /* 
     if( window.plugins && window.plugins.NativeAudio ) {
     
     // Preload audio resources
     window.plugins.NativeAudio.preloadComplex( 'bepapp', 'assets/bepapp.mp3', 1, 1, 0, function(msg){
     }, function(msg){
         console.log( 'error: ' + msg );
     });
    
 
  
    window.plugins.NativeAudio.preloadSimple( 'bepapp', 'assets/bepapp.mp3', function(msg){
    console.log('audio:'+msg);
     }, function(msg){
         console.log( 'error: ' + msg );
     });
 
 
     }
 
  */

  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Iniciando"
    });

    this.loader.present();

  }

  getUDPE(valueExp) {
    var valExp = parseInt(valueExp) || 0;
    return valExp % 1500;
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot('InicioPage');
  }



  presentProfileModal() {
    let profileModal = this.modalCtrl.create('LoginPage');
    profileModal.present();
  }
  presentProfileModal2() {

    this.nav.push('LoginPage');
  }


  registroNegocio() {
    //  let profileModal = this.modalCtrl.create('NegocioregistroPage');
    //profileModal.present();
    //https://www.yourbeauty.com.pa/terminos/ 
    //this.nav.push('NegocioregistroPage');
    window.open("https://www.yourbeauty.com.pa/contacto-negocios/", '_system', 'location=yes');
  }

  compartirApp() {

    // not supported on some apps (Facebook, Instagram)

    var options = {
      message: 'Yourbeauty. Reserva belleza y bienestar en un sólo click.',
      subject: 'Yourbeauty', // fi. for email
      url: 'https://www.yourbeauty.com.pa/',
      chooserTitle: 'Selecciona un app'
    };




    window.plugins.socialsharing.shareWithOptions(options, (result) => {

      console.log("Share completed? ");
      console.log(result);

      let loading = this.loadingCtrl.create();
      loading.present();

      this.apiProvider.verificarPremioUs({ idCliente: this.userDataProfile.idCliente })
        .then(data => {
          console.log(data);

          loading.dismiss();

          if (data.compartidoNuevo > 0) {

            this.goAnimacion2(data.puntosGanados, data.dataUser[0].appexp, this.userDataProfile.exp);

            this.events.publish('userCreated', data.dataUser[0]);


          }
          else {
            this.presentAlert('Compartido', 'Gracias por compartir nuestra app!');
          }


        }, err => {
          loading.dismiss();
        });

    }, (msg) => {
      console.log("Sharing failed with message: " + msg);
    });

  }


  envioOK() {
    let alert = this.alertCtrl.create({
      title: 'Completado',
      subTitle: 'Te hemos enviado la contraseña nueva a tu correo',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  recupeCon() {

    this.nav.push('RecuperarPage');


  }
  /*
    recupeCon() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo Electronico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Recuperar',
          handler: data => {
            if (data.email) {
             
              // logged in!
              this.envioOK();
            } else {
              // invalid login
              console.log('mensaje vaciui');
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  */


  openCentroPage() {
    // this.nav.setRoot('PerfilCentroPage');
    this.nav.push('PerfilCentroPage');
  }

  salirApp(nombre) {
    nombre == "Salir" ? this.menuActivo = false : this.nav.setRoot('InicioPage');

  }

  getPorcentaje() {

    let enviar = ((900) / (this.userDataProfile.completadas * 100)) + '%';
    console.log(enviar);
    return enviar;


  }



  facebookLogin() {
    this.loading2.present();

    //faceLogin

    //this.menuActivo = true;

    facebookConnectPlugin.getLoginStatus((success) => {
      console.log(success);
      if (success.status === 'connected') {




        this.apiProvider.verificarFBLog({ userId: success.authResponse.userID })
          .then(data => {
            console.log(data);
            if (data.data.length > 0) {

              this.storage.get('pushKeyBY').then((value) => {
                if (value) {
                  console.log(value);
                  var pushState = {
                    pushK: value,
                    device: device.platform,
                    deviceId: device.uuid,
                    login: Date.now(),
                    user: data.data[0].idCliente
                  }
                  console.log(pushState);
                  this.apiProvider.addPush(pushState).then(data => {
                    console.log(data);
                  });
                }

                //value;

              });


              console.log('mas0len');
              this.storage.set(`usr_tok_by`, data.data[0]);
              this.userDataProfile = data.data[0];
              this.menuActivo = true;
              this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';
              this.loading2.dismissAll();
            }

            else {
              console.log('menos0len');
              this.addUserFb(success.authResponse);
              console.log('Ha ocurrido un error');
            }


          });



      }
      else {
        console.log('getLoginStatus', success.status);
        facebookConnectPlugin.login(['email', 'public_profile'], this.fbLoginSuccess, this.fbLoginError);
      }


    });


  }

  fbLoginError(error) {

    console.log('fbLoginEdrror', error);
    //mensajeAlerta(1, 'Ha ocurrido un error');
    //$ionicLoading.hide();
  };


  const getFacebookProfileInfo = (authResponse) => {

    return new Promise(resolve => {

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {
          console.log(response);
          resolve(response);
        },
        function (response) {
          console.log(response);
          resolve(response);
        }
      );


    });
    //var info = $q.defer();


  };



  // This is the success callback from the login method
  const fbLoginSuccess = (response) => {
    if (!response.authResponse) {
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    this.getFacebookProfileInfo(authResponse)
      .then((profileInfo) => {
        // For the purpose of this example I will store user data on local storage

        var usuario = {
          fbId: profileInfo.id,
          nombre: profileInfo.name,
          email: profileInfo.email,
          imagenFB: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
        };

        this.apiProvider.addUserFb(usuario).then((events) => {

          if (events.insertId > 0) {

            this.apiProvider.verificarFBLog({ userId: authResponse.userID })
              .then(data => {
                console.log(data);
                if (data.data.length > 0) {

                  this.storage.get('pushKeyBY').then((value) => {
                    if (value) {
                      console.log(value);
                      var pushState = {
                        pushK: value,
                        device: device.platform,
                        deviceId: device.uuid,
                        login: Date.now(),
                        user: data.data[0].idCliente
                      }
                      console.log(pushState);
                      this.apiProvider.addPush(pushState).then(data => {
                        console.log(data);
                      });
                    }

                    //value;

                  });


                  this.storage.set(`usr_tok_by`, data.data[0]);
                  this.userDataProfile = data.data[0];
                  this.menuActivo = true;
                  this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';

                  this.loading2.dismissAll();
                }
                else {
                  console.log('Ha ocurrido un error');
                }


              });

          }

          else {

            this.apiProvider.verificarFBLog({ userId: authResponse.userID })
              .then(data => {
                console.log(data);
                if (data.data.length > 0) {

                  this.storage.get('pushKeyBY').then((value) => {
                    if (value) {
                      console.log(value);
                      var pushState = {
                        pushK: value,
                        device: device.platform,
                        deviceId: device.uuid,
                        login: Date.now(),
                        user: data.data[0].idCliente
                      }
                      console.log(pushState);
                      this.apiProvider.addPush(pushState).then(data => {
                        console.log(data);
                      });
                    }

                    //value;

                  });



                  this.storage.set(`usr_tok_by`, data.data[0]);
                  this.userDataProfile = data.data[0];
                  this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';
                  this.menuActivo = true;
                  this.loading2.dismissAll();
                }
                else {
                  console.log('Ha ocurrido un error');
                }


              });
          }

        });

      }, function (fail) {
        // Fail get profile info
        console.log('profile info fail', fail);
      });
  };




  const addUserFb = (data) => {


    this.getFacebookProfileInfo(data)
      .then((profileInfo) => {
        // For the purpose of this example I will store user data on local storage

        var usuario = {
          fbId: profileInfo.id,
          nombre: profileInfo.name,
          email: profileInfo.email,
          imagenFB: "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
        };


        this.apiProvider.addUserFb(usuario).then((events) => {

          if (events.insertId > 0) {

            this.apiProvider.verificarFBLog({ userId: profileInfo.id })
              .then(data => {
                console.log(data);
                if (data.data.length > 0) {
                  console.log('addUserFbinsertplus0');
                  this.storage.set(`usr_tok_by`, data.data[0]);
                  this.userDataProfile = data.data[0];
                  this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';

                  this.menuActivo = true;
                  this.loading2.dismissAll();
                }
                else {
                  console.log('Ha ocurrido un error');
                }


              });

          }

          else {

            this.apiProvider.verificarFBLog({ userId: profileInfo.id })
              .then(data => {
                console.log(data);
                if (data.data.length > 0) {
                  console.log('addUserFbinsertmenos0');
                  this.storage.set(`usr_tok_by`, data.data[0]);
                  this.userDataProfile = data.data[0];
                  this.menuActivo = true;
                  this.porcenBarra = (((this.userDataProfile.exp % 1500) / (this.userDataProfile.appexp)) * 100) + '%';
                  this.loading2.dismissAll();
                }
                else {
                  console.log('Ha ocurrido un error');
                }


              });
          }

        });
      })


  }

  goPagina(pagina) {
    console.log(pagina);
    if ('logout' == pagina) {

      this.apiProvider.cerrarS({ idCliente: this.userDataProfile.idCliente, device: device.uuid })
        .then(data => {
          console.log(data);
        });

      this.events.publish('userLogout');
      this.events.publish('loginOK');

      facebookConnectPlugin.logout(res => {
        //  this.events.publish('userLogout');
      }, e => {
        console.log('Error logout from Facebook', e);
        // this.events.publish('userLogout');
      });



      //cerrarS




    }
    else {
      if (pagina == 'OfertasPage' || pagina == 'PaquetesPage') {

        this.nav.push(pagina);

      }

      else { this.nav.setRoot(pagina); }



    }


  }
}
