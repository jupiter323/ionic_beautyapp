import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  api2='http://50.116.17.150:3000';
  //api2='https://centro.yourbeauty.com.pa:8443';

  constructor(public http: HttpClient,public storage: Storage) {
   // console.log('Hello ApiProvider Provider');
  }

    verificarLogin() {
      return new Promise(resolve => {
      this.storage.get('usr_tok_by').then((value) => {
   // console.log(value);
    value ? resolve(value) : resolve(false);
    }).catch(() => resolve(false))
    });
  }


    getCarrito() {
      return new Promise(resolve => {
      this.storage.get(`carrito`).then((value) => {
   // console.log(value);
    value ? resolve(value) : resolve([]);
    }).catch(() => resolve(false))
    });
  }


    getTotal() {
      return new Promise(resolve => {
      this.storage.get(`carrito`).then((value) => {
   // console.log(value);

   let total = 0;
   

    value.forEach((elementw, index) => {
    total +=  parseFloat(elementw.precioFinal);
    });


    resolve(total);

    }).catch(() => resolve(false))
    });
  }


          addProductoz(productoz) {
      return new Promise(resolve => {
       
      productoz.forEach((item,index)=>{
      item.precioFinal = item.precioCobrado;
      });
         this.storage.get('carrito').then((value) => {

          this.storage.set(`carrito`, productoz);
          resolve(productoz);
        


        }).catch(() => resolve(false))
        });
    }



      addProductoPaquete(productoz) {
      return new Promise(resolve => {
       
       
      let carrito = [];
      productoz.forEach((item,index)=>{
        var nI = {};
        nI.duracion = item.duracionServicio;
        nI.idCategoria = item.idCategoria;
        nI.idServicio = item.idServicio;
        nI.imagenCategoria = null;
        nI.nombre = item.nombreServicio;
        nI.nombreCategoria = null;
        nI.precio = item.precioServicio;
        nI.precioFinal = item.precioServicio;
        nI.precioPaquete = item.precioPaquete;
        nI.oferta = null;
        carrito.push(nI);
      });
        this.storage.set(`carrito`, carrito);
        resolve(carrito);
      });
    }  

          addProducto(producto) {
      return new Promise(resolve => {
       
         this.storage.get('carrito').then((value) => {
         if(value){
         value.push(producto);
         this.storage.set(`carrito`, value);
         resolve(value);
        }
        else{
          let carrito = [];
          carrito.push(producto);
          this.storage.set(`carrito`, carrito);
          resolve(carrito);
        }
        }).catch(() => resolve(false))
        });
    }


          sacarProducto(servicio) {
      return new Promise(resolve => {
       
         this.storage.get(`carrito`).then((value) => {
         if(value){
         //let index = value.indexOf(idServicio);
         let index = value.findIndex(i => i.idServicio === servicio);
            if (index > -1) {
            value.splice(index, 1);
            }
         console.log(value);
         this.storage.set(`carrito`, value);
         resolve(value);
        }
        else{
          resolve([]);
        }
        }).catch(() => resolve(false))
        });
    }

          vaciarCarrito() {
      return new Promise(resolve => {
       
         let carrito = [];
          this.storage.set(`carrito`, carrito);
          resolve(carrito);


        });
    }




  //this.storage.set(`usr_tok_datagym`, data.data[0]);


    categoriasHome() {
    return new Promise(resolve => {
      this.http.get(this.api2+'/categoriasHome3').subscribe(data => {
      console.log('d');
        resolve(data);
      }, err => {
        console.log(err);
     resolve(false);

      });
    });
  }


 doLoginApi(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/doLoginApi', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

 cerrarS(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/cerrarS', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  
 cancelarCita(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/cancelarCita', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

   getCitaPendientesN(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCitaPendientesN', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

   agregarOpinion(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/agregarOpinion', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
         resolve(false);
      });
    });
  }
  
   getCuponPremio(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCuponPremio', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


   getCC(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCC', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
          resolve(false);
      });
    });
  }

  
   actualizarDataINL(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/actualizarDataINL', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

   getUserInfo(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getUserInfo', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
          resolve(false);
      });
    });
  }
  
  
   reprogramarCita(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/reprogramarCita', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  


   reprogramarCitaNC(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/reprogramarCitaNCAPP', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

     verificarPremioUs(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/verificarPremioUs', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  

     aceptarReprogramacion(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/aceptarReprogramacion', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
     quitarAnimacion(da) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/quitarAnimacion', JSON.stringify(da),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
 getHorasDispo(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getHorasDispo', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }
 buscarServiciosFiltro(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/buscarServiciosFiltro', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
              resolve(false);
      });
    });
  }
 getSubcategorias(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getSubcategorias', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
              resolve(false);
      });
    });
  }


   getDataCita(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getDataCita', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
          resolve(false);
      });
    });
  }


   editarUsuario(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/editarUsuario', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
          resolve(false);
      });
    });
  }


     getServiciosCategoria(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getServiciosCategoria22', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

       verificarEmail2(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/verificarEmail3', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

       getEmpleadosDisponibles(credenciales) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getEmpleadosDisponibles', JSON.stringify(credenciales),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
         resolve(false);
      });
    });
  }



      addPush(dd) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/addPush', JSON.stringify(dd),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

      categoriasActivas() {
    return new Promise(resolve => {
      this.http.get(this.api2+'/categoriasActivas').subscribe(data => {
      console.log('d');
        resolve(data);
      }, err => {
     resolve(false);
        console.log(err);

      });
    });
  }
  
      horaMinMax() {
    return new Promise(resolve => {
      this.http.get(this.api2+'/horaMinMax').subscribe(data => {
      console.log('d');
        resolve(data);
      }, err => {
     resolve(false);
        console.log(err);

      });
    });
  }
  

    getCentroInfo(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCentroInfoFix', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }  

      cambiarFavorito(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/cambiarFavorito', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  

      reservasUser(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/reservasUser', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
         resolve(false);
      });
    });
  }  
  


      addCita(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/addCita', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
           resolve(false);
      });
    });
  } 

      reproCitaApp(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/reproCitaApp', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  } 
  


      getCentroServicios(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCentroServicios', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  } 
  
      getCentroServicios2(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCentroServicios2', JSON.stringify(data),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  } 
  



   paquetesActivos(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/paquetesActivos22', JSON.stringify(data), {headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }




   ofertasActivas(data) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/ofertasActivas2', JSON.stringify(data), {headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }

   favoritosGPS2(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/favoritosGPS2', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
           resolve(false);
      });
    });
  }


   favoritosGPS(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/favoritosGPS', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

     getCentrosMapa(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCentrosMapaFix', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
          resolve(false);
      });
    });
  }
  getOpiniones(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getOpiniones', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
            resolve(false);
      });
    });
  }

    recuperarPass(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/recuperarPass', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



  addUserFb(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/addUserFb', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  
  addUserEmail(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/addUserEmail', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
         resolve(err);
      });
    });
  }


    addNegocio(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/addNegocio2', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


    
verificarFBLog(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/verificarFBLog', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

    
verificarCuenta(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/verificarCuenta', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  getCupones(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCupones', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  
  getCuponesApp(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/getCuponesApp', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }

  


  canjearCupon(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/canjearCupon', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

    buscarOfertas(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/buscarOfertas', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  
   buscarServicios(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/buscarServiciosGPS', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
   buscarServicios2(filtro) {
    return new Promise(resolve => {
      this.http.post(this.api2+'/buscarServiciosGPS2', JSON.stringify(filtro),{headers:{'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }




}