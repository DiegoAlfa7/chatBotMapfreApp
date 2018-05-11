import {Component, Input} from '@angular/core';
import {Message} from "../../app/classes/Message";

/**
 * Generated class for the MessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-user-message',
  templateUrl: 'message.html'
})
export class MessageComponent {

  @Input() public message:Message;


  constructor() {




  }

}
