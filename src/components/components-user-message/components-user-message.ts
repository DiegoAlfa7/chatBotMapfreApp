import {Component, Input} from '@angular/core';
import {Message} from "../../app/classes/Message";

/**
 * Generated class for the UserMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-user-message',
  templateUrl: 'components-user-message.html'
})
export class UserMessageComponent {

  @Input() public message:Message;

  constructor() {

  }

}
