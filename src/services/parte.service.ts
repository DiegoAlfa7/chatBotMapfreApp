import {Injectable} from "@angular/core";
import {Insured} from "../app/classes/Insured";

@Injectable()
export class ParteService{

  private _asegurado1: Insured;
  private _asegurado2: Insured;

  private _matricula_coche_1: string;
  private _matricula_coche_2: string;

  private _base64_accidente:string;
  private _url_audioAccidente:string;


  constructor(){

      this._asegurado1 = new Insured();
      this._asegurado2 = new Insured();

  }


  get url_audioAccidente(): string {
    return this._url_audioAccidente;
  }

  set url_audioAccidente(value: string) {
    this._url_audioAccidente = value;
  }

  get asegurado1(): Insured {
    return this._asegurado1;
  }

  set asegurado1(value: Insured) {
    this._asegurado1 = value;
  }

  get asegurado2(): Insured {
    return this._asegurado2;
  }

  set asegurado2(value: Insured) {
    this._asegurado2 = value;
  }

  get matricula_coche_1(): string {
    return this._matricula_coche_1;
  }

  set matricula_coche_1(value: string) {
    this._matricula_coche_1 = value;
  }

  get matricula_coche_2(): string {
    return this._matricula_coche_2;
  }

  set matricula_coche_2(value: string) {
    this._matricula_coche_2 = value;
  }

  get base64_accidente(): string {
    return this._base64_accidente;
  }

  set base64_accidente(value: string) {
    this._base64_accidente = value;
  }
}
