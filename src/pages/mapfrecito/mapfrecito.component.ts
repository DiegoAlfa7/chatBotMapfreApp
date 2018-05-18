import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Content, Grid, NavParams} from 'ionic-angular';
import {Message} from "../../app/classes/Message";
import {ContextGateController} from "../../services/context-gate-controller.service";
import {MessagesService} from "../../services/messages.service";
import {ParteService} from "../../services/parte.service";
import {Insured} from "../../app/classes/Insured";

@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.template.html'
})
export class MapfrecitoComponent implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild(Grid, {read: ElementRef}) messageFeedNode: ElementRef;

  public messageFeed: Message[] = [];
  public lastMsg: string;
  private messageFeedChangeObserver: MutationObserver;
  public usuarioRegistrado: any = this.navParams.get('name');

  constructor(
    private navParams: NavParams,
    private gate: ContextGateController,
    private messages: MessagesService,
    private parte: ParteService
  ) {

    this.messages.getMessageListObserver().subscribe((messages: Message[]) => {
      this.messageFeed = messages;
    });


  }

  ionViewWillEnter() {
    console.log(this.usuarioRegistrado);

    //This is the app enter point, so the service should not have any data set

    let asegurado:Insured = new Insured();
    asegurado.nombre = this.usuarioRegistrado;
    this.parte.asegurado1 = asegurado;
    this.gate.sendLoginAsegurado(this.usuarioRegistrado);

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

      this.gate.sendVisibleMessage(this.lastMsg);

      this.lastMsg = '';
    }
  }

  public cargarMensajes(infiniteScrollEvent) {

  }

  public scrollToBottom() {

    this.content.scrollToBottom(300);

  }
}
