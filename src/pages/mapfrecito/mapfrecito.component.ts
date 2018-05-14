import {Component, OnInit, ViewChild} from "@angular/core";
import {Message} from "../../app/classes/Message";
import {Content} from "ionic-angular";
import {MapfreService} from "../../services/mapfre.service";



@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.template.html',
  
})
export class MapfrecitoComponent implements OnInit{

  @ViewChild(Content) content:Content;

  public messageFeed:Message[];
  public lastMsg: string;

  constructor(private mapfreService: MapfreService){


    this.messageFeed = [



    ];

  }

  ngOnInit(){


    this.mapfreService.sendQuery('Hola').subscribe((result:any) =>{


      this.messageFeed.push(new Message(result.result.speech,'bot'));


    });



  }


  /**
   * This method uses de template-binded variable 'lastMsg' in order to send query to DialogFlow API
   */
  public enviarMensaje(){

    this.scrollToBottom();

    if(this.lastMsg && this.lastMsg != '') {


      this.messageFeed.push(new Message(this.lastMsg, 'user'));

      this.mapfreService.sendQuery(this.lastMsg).subscribe((result: any) => {


        this.messageFeed.push(new Message(result.result.speech, 'bot'));


      });

      this.lastMsg = '';

    }




  }
  public cargarMensajes(infiniteScrollEvent){






  }
  public scrollToBottom(){
    this.content.scrollToBottom(300);
  }

}
