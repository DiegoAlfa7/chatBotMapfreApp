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

  /**
   * returns a string like: DatosAsegurado: Jose , Martín Gomez,  Avenida de Euskadi 8 , Madrid ,  , 623345123 , No , Seat , Leon ,  , 234234 , mapfre , No
   * the values are separated by columns and every value is directly surrounded by character spacings so if any value is not initialized, it would be replaced by duble-spacing.
   * @returns {string} DatosAsegurado-like string representation of an Insured object
   */
  public getDatosAsegurado1():string{

    return `DatosAsegurado: ${this.asegurado1.nombre || ''} , ${this.asegurado1.apellidos || ''} , ${this.asegurado1.direccion || ''} , ${this.asegurado1.localidad || ''} , ${this.asegurado1.cp || ''} , ${this.asegurado1.telefono || ''} , ${this.asegurado1.recuperar_iva ? 'Si':'No'} , ${this.asegurado1.marca || ''} , ${this.asegurado1.modelo || ''} , ${this.asegurado1.matricula || ''} , ${this.asegurado1.poliza || ''} , ${this.asegurado1.agencia || ''} , ${this.asegurado1.d_prop_asegurados ? 'Si': 'No'} `;


  }

  /**
   * returns a string like: DatosAsegurado: Jose , Martín Gomez,  Avenida de Euskadi 8 , Madrid ,  , 623345123 , No , Seat , Leon ,  , 234234 , mapfre , No
   * the values are separated by columns and every value is directly surrounded by character spacings so if any value is not initialized, it would be replaced by duble-spacing.
   * @returns {string} DatosAsegurado-like string representation of an Insured object
   */
  public getDatosAsegurado2():string{

    return `DatosAsegurado: ${this.asegurado2.nombre || ''} , ${this.asegurado2.apellidos || ''} , ${this.asegurado2.direccion || ''} , ${this.asegurado2.localidad || ''} , ${this.asegurado2.cp || ''} , ${this.asegurado2.telefono || ''} , ${this.asegurado2.recuperar_iva ? 'Si':'No'} , ${this.asegurado2.marca || ''} , ${this.asegurado2.modelo || ''} , ${this.asegurado2.matricula || ''} , ${this.asegurado2.poliza || ''} , ${this.asegurado2.agencia || ''} , ${this.asegurado2.d_prop_asegurados ? 'Si': 'No'} `;


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
