import { Component } from '@angular/core';

/**
 * Generated class for the EspecialselectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'especialselect',
  templateUrl: 'especialselect.html'
})
export class EspecialselectComponent {

  text: string;

  constructor() {
    console.log('Hello EspecialselectComponent Component');
    this.text = 'Hello World';
  }

}
