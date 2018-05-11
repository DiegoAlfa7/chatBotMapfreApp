import {Component} from "@angular/core";
import {Message} from "../../app/classes/Message";


@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.template.html',



})
export class MapfrecitoComponent{

  public messageFeed:Message[];

  constructor(){


    this.messageFeed = [

      new Message('Message1'),
      new Message('Message2'),
      new Message('Message3'),
      new Message('Message4'),
      new Message('Message5'),

    ];

  }

}
