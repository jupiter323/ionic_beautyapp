import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
    

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'InicioPage';

  authForm: FormGroup;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public formBuilder: FormBuilder) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

 
        this.authForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });




  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        this.menuActivo = true;
    });
  }
  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot('InicioPage');
  }

    openCentroPage() {
   // this.nav.setRoot('PerfilCentroPage');
   this.nav.push('PerfilCentroPage');
  }

  salirApp(nombre){
  nombre == "Salir" ? this.menuActivo = false :  this.nav.setRoot('InicioPage');
  
  }


  loginApp(){
  this.menuActivo = true;
  }



  goPagina(pagina){
  console.log(pagina);
  this.nav.setRoot(pagina);

  }
}
