import {Component, Input} from '@angular/core';
import {Message} from "../../app/classes/Message";

/**
 * Generated class for the UserMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bot-message',
  templateUrl: 'bot-message.html'
})
export class BotMessageComponent {

  @Input() public message:Message;

  constructor() {

  }

}
