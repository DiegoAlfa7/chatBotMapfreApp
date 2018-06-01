import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'app/classes/Message';
import { BaseMessage } from 'app/classes/BaseMessage';
import { ContextGateController } from 'services/context-gate-controller.service';

/**
 * Generated class for the MessagePhoneFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-phone-form',
  host: {
    class: 'message-phone-form'
  },
  templateUrl: 'message-phone-form.template.html'
})
export class MessagePhoneFormComponent extends BaseMessage implements OnInit {

  @Input() public message: Message;

  private phoneNumber: string;

  private isAllDone: boolean = false;

  private optionalPhoneNumber: boolean = false;

  constructor(private gate: ContextGateController) {
    super();
  }

  ngOnInit(): void {
    this.toggleLock();
  }

  sendPhoneNumber ():void {
    this.isAllDone = true;
    this.gate.sendInvisibleMessage(`+34 ${this.phoneNumber}`);
    this.toggleLock();
    this.blockInput.complete();
  }

  noGivePhoneNumber(): void{
    this.isAllDone = true;
    this.gate.sendInvisibleMessage(`Paso`);
    this.toggleLock();
    this.blockInput.complete();
  }

}
