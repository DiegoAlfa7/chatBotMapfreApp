import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Content, Grid, NavController, NavParams} from 'ionic-angular';
import {Message} from "../../app/classes/Message";
import {ContextGateController} from "../../services/context-gate-controller.service";
import {MessagesService} from "../../services/messages.service";
import {ParteService} from "../../services/parte.service";
import {Insured} from "../../app/classes/Insured";
import {FormularioPage} from "../formulario/formulario";

@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.template.html'
})
export class MapfrecitoComponent implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild(Grid, {read: ElementRef}) messageFeedNode: ElementRef;

  //TODO: implement input lock when last message context asks for photo
  public messageFeed: Message[] = [];
  public lastMsg: string;
  public bloquear: boolean = false;
  private messageFeedChangeObserver: MutationObserver;
  public usuarioRegistrado: any = this.navParams.get('name');
  private once: boolean = false;

  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private gate: ContextGateController,
    private messages: MessagesService,
    private parte: ParteService
  ) {

    this.messages.getMessageListObserver().subscribe((messages: Message[]) => {
      this.messageFeed = messages;
    });
    /*this.messages.addMessage(new Message('hi', 'audio_intent', 'bot', 'user', undefined));*/


  }


  public blockInput(event:any){

    console.log(event);
    this.bloquear = event.lock;




  }

  private ionViewWillEnter() {

    if (!this.once) {

    console.log(this.usuarioRegistrado);
    //This is the app enter point, so the service should not have any data set
    this.parte.asegurado1.nombre = this.usuarioRegistrado;
    this.gate.sendLoginAsegurado(this.usuarioRegistrado);
    this.once = true;
  }
  }

  ngOnInit() {


    this.messageFeedChangeObserver = new MutationObserver((mutations) => {
      this.scrollToBottom()
    });

    this.messageFeedChangeObserver.observe(this.messageFeedNode.nativeElement, {
      childList: true
    });

  }


  private goToParte(){


    this.navController.push(FormularioPage);

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
