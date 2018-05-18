import { MESSAGE_AUDIO_INTENT } from './../../app/app.constants';
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Content, Grid, NavParams} from 'ionic-angular';
import {Message} from "../../app/classes/Message";
import {MapfreService} from "../../services/mapfre.service";
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
  public usuarioRegistrado: any = this.navParams.get('name');

  constructor(private mapfreService: MapfreService, public navParams: NavParams) {

    this.messageFeed = [];

  }

  ionViewWillEnter() {
    console.log(this.usuarioRegistrado);

    if (this.usuarioRegistrado) {
      this.mapfreService.sendQuery('loginasegurado:' + this.usuarioRegistrado).subscribe((result: any) => {
        this.messageFeed.push(new Message(result.result.speech, GLOBALS.MESSAGE_TEXT, 'bot'));
      });
    } else {
      this.mapfreService.sendQuery('Hola').subscribe((result: any) => {
        this.messageFeed.push(new Message(result.result.fulfillment.speech, GLOBALS.MESSAGE_TEXT, 'bot'));
      });
    }
    this.messageFeed.push(new Message('necesito un audio', GLOBALS.MESSAGE_AUDIO_INTENT, 'bot'));
  }

  mapeoPeticion(){




  }

  ngOnInit() {



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
