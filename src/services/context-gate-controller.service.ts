import {Injectable} from "@angular/core";
import {MapfreService} from "./mapfre.service";
import {MessagesService} from "./messages.service";
import {ParteService} from "./parte.service";
import {BotResponse} from "../app/classes/BotResponse";
import {Message} from "../app/classes/Message";
import * as GLOBALS from '../app/app.constants';
import {BotContext} from "../app/classes/BotContext";
import {Observable} from "rxjs/Observable";

import * as operations from '../app/classes/ContextOperator';

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

        // Response is fingruaasegurado, so its expecting DatosAsegurado-like expresion with data
        case (operations.contains_noContainsStartWith(botResponse.contexts, 'fingruaasegurado', 'completardatosasegurado_dialog_params')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: '[...] desea completar el parte de seguro mientras llega?'

          //      TEXTO_ENVIADO: 'Sí' (no tiene por que)

          //      RESPUESTA_ACTUAL_TEXTO: 'Vamos a comprobar todos los datos [...] procederemos a completar los del otro vehiculo'

          //      COMPORTAMIENTO: Debemos enviar la palabra clave 'DatosAsegurado:[...]' con todos los campos del asegurado
          //                      de los que dispongamos en nuestro servicio de asegurado y además pintar el mensaje de respuesta

          this.sendInvisibleMessage(this.parte.getDatosAsegurado1());
          console.log(this.parte.getDatosAsegurado1()+' Enviado...');
          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;

        case (operations.only_contains(botResponse.contexts, 'matriculacontrariocogida')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: 'Necesitamos la matrícula del otro conductor'

          //      TEXTO_ENVIADO: [matricula]

          //      RESPUESTA_ACTUAL_TEXTO: 'Ahora necesitamos una foto del accidente'

          //      COMPORTAMIENTO: Tenemos que pintar un mensaje de foto, guardar el valor de la matrícula del otro conductor
          //                      Y mandar un mensaje clave de 'VideoRealizado'


          this.parte.asegurado2.matricula = botResponse.paramsRespose.matriculaContrario;
          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_CAMERA_INTENT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;


        // Response is fingruaasegurado with matricula parameter
        case (operations.containsParameterWithName(botResponse.contexts, 'matricula')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: Peticion de un parámetro

          //      TEXTO_ENVIADO: un código postal

          //      RESPUESTA_ACTUAL_TEXTO: 'Necesitamos una foto de tu matricula'

          //      COMPORTAMIENTO: Deberíamos crear un mensaje de foto OCR con el texto que mande el bot



          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_MATRICULA1_INTENT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;


       case (operations.only_contains(botResponse.contexts, 'datosaseguradocompletos')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: Se ha pedido el último parámetro del asegurado 1

          //      TEXTO_ENVIADO: (whatever)

          //      RESPUESTA_ACTUAL_TEXTO: 'Ahora necesitamos que introduzcas la matricula del otro conductor'

          //      COMPORTAMIENTO: Deberíamos crear un mensaje de foto OCR con el texto que mande el bot



          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_MATRICULA2_INTENT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;


        /* case (operations.only_contains(botResponse.contexts, 'matriculacontrariocogida')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: Se ha pedido la matrícula del otro conductor

          //      TEXTO_ENVIADO: (whatever)

          //      RESPUESTA_ACTUAL_TEXTO: 'Ahora necesitamos una foto del accidente'

          //      COMPORTAMIENTO: Deberíamos crear un mensaje de foto OCR con el texto que mande el bot



          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_CAMERA_INTENT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break; */


        case (operations.only_contains(botResponse.contexts, 'videofinalizado')):

          //CASOS:

          // 1 -  RESPUESTA_ANERIOR: Foto del accidente

          //      TEXTO_ENVIADO: (whatever??)

          //      RESPUESTA: (whatever??)

          //      COMPORTAMIENTO: Mostrar el boton para grabar audio



          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_AUDIO_INTENT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;

        default:
          // EL COMPORTAMIENTO POR DEFECTO CUANDO SE LEE UNA RESPUESTA_ACTUAL_TEXTO DEBE SER PINTAR EL MENSAJE DEL BOT, UN MENSAJE NORMAL
          this.messages.addMessage(new Message(botResponse.speech, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_BOT, GLOBALS.STR_USER, botResponse.contexts[0]));

          break;



      }





  }












}
