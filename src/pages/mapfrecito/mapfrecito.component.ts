import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Message } from "../../app/classes/Message";
import { Content, Grid } from "ionic-angular";
import { MapfreService } from "../../services/mapfre.service";
import * as GLOBALS from '../../app/app.constants';

@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.template.html'
})
export class MapfrecitoComponent implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild(Grid, { read: ElementRef }) messageFeedNode: ElementRef;

  public messageFeed: Message[];
  public lastMsg: string;
  private messageFeedChangeObserver: MutationObserver;

  constructor(private mapfreService: MapfreService) {

    this.messageFeed = [];

  }

  ngOnInit() {

    this.mapfreService.sendQuery('Hola').subscribe((result: any) => {
      this.messageFeed.push(new Message(result.result.speech, GLOBALS.MESSAGE_TEXT, 'bot'));
    });

    this.messageFeedChangeObserver = new MutationObserver((mutations) => {
      this.scrollToBottom()
    });

    this.messageFeedChangeObserver.observe(this.messageFeedNode.nativeElement, {
      childList: true
    });
  }


  /**
   * This method uses de template-binded variable 'lastMsg' in order to send query to DialogFlow API
   */
  public enviarMensaje() {

    if (this.lastMsg && this.lastMsg != '') {

      this.messageFeed.push(new Message(this.lastMsg, GLOBALS.MESSAGE_TEXT, 'user'));

      this.mapfreService.sendQuery(this.lastMsg).subscribe((result: any) => {

        this.messageFeed.push(new Message(result.result.speech, GLOBALS.MESSAGE_TEXT, 'bot'));

      });

      this.lastMsg = '';
    }
  }

  public cargarMensajes(infiniteScrollEvent) {

  }

  public scrollToBottom() {

    this.content.scrollToBottom(300);

  }
}
