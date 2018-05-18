import {Injectable} from "@angular/core";
import {MapfreService} from "./mapfre.service";
import {MessagesService} from "./messages.service";
import {ParteService} from "./parte.service";
import {BotResponse} from "../app/classes/BotResponse";
import {Message} from "../app/classes/Message";
import * as GLOBALS from '../app/app.constants';
import {BotContext} from "../app/classes/BotContext";
import {Observable} from "rxjs/Observable";

import * as cOp from '../app/classes/ContextOperator';

/**
 *  The main logic of the application, manages communication between MapfrecitoComponent an all the services involved in the process
 */
@Injectable()
export class ContextGateController {


  /**
   * Injecting all the services involved in the application
   */
  constructor(

    private mapfre:MapfreService,
    private parte:ParteService,
    private messages:MessagesService


  ){}




  public sendLoginAsegurado(nombre:string){

    this.sendInvisibleMessage(`loginAsegurado:${nombre}`);


  }

  public sendVisibleMessage(text:string){

    this.messages.addMessage(new Message(text, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_USER, GLOBALS.STR_BOT));
    this.waitAndMapResponse(this.mapfre.sendQuery(text));

  }


  public sendInvisibleMessage(text:string){

    this.waitAndMapResponse(this.mapfre.sendQuery(text));

  }

  private waitAndMapResponse(objectObservable: Observable<Object>) {



    objectObservable.subscribe( (dialogResponse:any) => {
      let respuestaBot:BotResponse = new BotResponse();
      //Mapping all data
      respuestaBot.pregunta = dialogResponse.result.resolvedQuery;
      respuestaBot.speech = dialogResponse.result.fulfillment.speech;
      respuestaBot.paramsRespose = dialogResponse.result.parameters;
      respuestaBot.contexts = dialogResponse.result.contexts.map((context) => {

        let context1:BotContext = new BotContext();
        context1.name = context.name;
        context1.params = context.params;
        return context1;

      });

      this.responseGate(respuestaBot);

    });




  }

  private responseGate(botResponse: BotResponse) {


      console.log(botResponse);

      switch (true){


        case (cOp.contains_noContainsStartWith(botResponse.contexts, 'fingruaasegurado', 'completardatosasegurado_dialog_params')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: '[...] desea completar el parte de seguro mientras llega?'

          //      TEXTO_ENVIADO: 'Sí' (no tiene por que)

          //      RESPUESTA: 'Vamos a comprobar todos los datos [...] procederemos a completar los del otro vehiculo'

          //      COMPORTAMIENTO: Debemos enviar la palabra clave 'DatosAsegurado:[...]' con todos los campos del asegurado
          //                      de los que dispongamos en nuestro servicio de asegurado y además pintar el mensaje de respuesta

          this.sendInvisibleMessage(this.parte.getDatosAsegurado1());
          console.log(this.parte.getDatosAsegurado1()+' Enviado...');
          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;




        default:
          // EL COMPORTAMIENTO POR DEFECTO CUANDO SE LEE UNA RESPUESTA DEBE SER PINTAR EL MENSAJE DEL BOT, UN MENSAJE NORMAL
          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;



      }





  }












}
