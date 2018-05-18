import {Injectable} from "@angular/core";
import {MapfreService} from "./mapfre.service";
import {MessagesService} from "./messages.service";

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
    //private sharedData:SharedDataService,
    private messages:MessagesService


  ){}












}
