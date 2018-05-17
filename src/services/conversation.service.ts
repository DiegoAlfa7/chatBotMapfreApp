import {Injectable} from "@angular/core";
import {Insured} from "../app/classes/Insured";

@Injectable()
export class ConversationService{

  public asegurado1: Insured;
  public asegurado2: Insured;

  public matricula_coche_1: string;
  public matricula_coche_2: string;

  public foto_accidente:string;

  constructor(){




  }

}
