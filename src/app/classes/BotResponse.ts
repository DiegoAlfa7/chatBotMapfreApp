import {BotContext} from "./BotContext";

export interface BotResponse{

  pregunta:string;
  paramsRespose:any;
  speech:string;
  contexts:BotContext[];



}
