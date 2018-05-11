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

      new Message("Message1", "bot"),
      new Message('Message2', "user"),
      new Message('Message3', "bot"),
      new Message('Message4', "user" ),
      new Message('Message5', "user"),

    ];

  }

}
