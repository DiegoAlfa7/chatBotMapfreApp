import {Component, Input} from '@angular/core';
import {Message} from "../../app/classes/Message";
import * as GLOBALS from '../../app/app.constants';

/**
 * Generated class for the MessageAbstract component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-user-message',
  templateUrl: 'message_abstract.template.html'
})
export class MessageAbstract {

  @Input() public message:Message;

  public photoIntentType:string = GLOBALS.MESSAGE_PHOTO_INTENT;
  public audioIntentType:string = GLOBALS.MESSAGE_AUDIO_INTENT;
  public textType:string = GLOBALS.MESSAGE_TEXT;


  constructor() {




  }

}
