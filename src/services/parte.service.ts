import { Injectable } from "@angular/core";
import { Insured } from "../app/classes/Insured";
import { ExternalsService } from "./externals.service";

@Injectable()
export class ParteService {

  private _asegurado: Insured;
  private _contrario: Insured;

  private _matricula_coche_asegurado: string;
  private _matricula_coche_contrario: string;

  private _base64_accidentes: string[];
  private _urlVideoAccidente: string;
  private _url_audioAccidente: string;
  private _path_audioAccidente: string;
  private _audioFileName: string;

  private _parteEnviado: boolean = false;




  constructor(private external: ExternalsService) {

    this._asegurado = new Insured();
    this._contrario = new Insured();
    this.external.getDatosAsegurado().subscribe((response: any) => {

      this._asegurado.telefono = response.telefono;
      this._asegurado.cp = response.cp;
      this._asegurado.poliza = response.poliza;
      this._asegurado.d_prop_asegurados = response.d_prop_asegurados;
      this._asegurado.c_verde_val = response.c_verde_val;
      this._asegurado.c_verde = response.c_verde;
      this._asegurado.localidad = response.localidad;
      this._asegurado.apellidos = response.apellidos;
      this._asegurado.direccion = response.direccion;
      this._asegurado.matricula = response.matricula;
      this._asegurado.agencia = response.agencia;
      this._asegurado.marca = response.marca;
      this._asegurado.recuperar_iva = response.recuperar_iva;

      console.log('Asegurado: ');
      console.log(this._asegurado);

    });

    this.external.getDatosParte().subscribe((response: any) => {

      this._contrario.telefono = response.telefono;
      this._contrario.cp = response.cp;
      this._contrario.poliza = response.poliza;
      this._contrario.d_prop_asegurados = response.d_prop_asegurados;
      this._contrario.c_verde_val = response.c_verde_val;
      this._contrario.c_verde = response.c_verde;
      this._contrario.localidad = response.localidad;
      this._contrario.apellidos = response.apellidos;
      this._contrario.direccion = response.direccion;
      this._contrario.matricula = response.matricula;
      this._contrario.agencia = response.agencia;
      this._contrario.marca = response.marca;
      this._contrario.recuperar_iva = response.recuperar_iva;

      console.log('Asegurado: ');
      console.log(this._contrario);

    });
  }


  /**
   * returns a string like: DatosAsegurado: Jose , Martín Gomez,  Avenida de Euskadi 8 , Madrid ,  , 623345123 , No , Seat , Leon ,  , 234234 , mapfre , No
   * the values are separated by columns and every value is directly surrounded by character spacings so if any value is not initialized, it would be replaced by duble-spacing.
   * @returns {string} DatosAsegurado-like string representation of an Insured object
   */
  public getDatosAsegurado(): string {
    return `DatosAsegurado: ${this.asegurado.nombre || ''}  , ${this.asegurado.apellidos || ''} , ${this.asegurado.direccion || ''} , ${this.asegurado.localidad || ''} , ${this.asegurado.cp || ''} , ${this.asegurado.telefono || ''} , ${this.asegurado.recuperar_iva == 'True' ? 'Si' : 'No'} , ${this.asegurado.marca || ''} , ${this.asegurado.modelo || ''} , ${this.asegurado.matricula || ''} , ${this.asegurado.poliza || ''} , ${this.asegurado.agencia || ''} , ${this.asegurado.d_prop_asegurados == 'True' ? 'Si' : 'No'} `;
  }

  /**
   * returns a string like: DatosAsegurado: Jose , Martín Gomez,  Avenida de Euskadi 8 , Madrid ,  , 623345123 , No , Seat , Leon ,  , 234234 , mapfre , No
   * the values are separated by columns and every value is directly surrounded by character spacings so if any value is not initialized, it would be replaced by duble-spacing.
   * @returns {string} DatosAsegurado-like string representation of an Insured object
   */
  public getDatosContrario(): string {
    return `DatosAsegurado: ${this.contrario.nombre || ''} , ${this.contrario.apellidos || ''} , ${this.contrario.direccion || ''} , ${this.contrario.localidad || ''} , ${this.contrario.cp || ''} , ${this.contrario.telefono || ''} , ${this.contrario.recuperar_iva ? 'Si' : 'No'} , ${this.contrario.marca || ''} , ${this.contrario.modelo || ''} , ${this.contrario.matricula || ''} , ${this.contrario.poliza || ''} , ${this.contrario.agencia || ''} , ${this.contrario.d_prop_asegurados ? 'Si' : 'No'} `;
  }

  public getDescripcionAccidenteFinalizada(): string {

    return `DescripcionAccidenteFinalizada: ${this.contrario.nombre || ''},
      ${this.contrario.apellidos || ''}
      ${this.contrario.localidad || ''},
      ${this.contrario.cp || ''},
      ${this.contrario.telefono || ''},
      ${this.contrario.recuperar_iva ? 'Si' : 'No'},
      ${this.contrario.marca || ''},
      ${this.contrario.modelo || ''},
      ${this.contrario.poliza || ''},
      ${this.contrario.agencia || ''},
      ${this.contrario.d_prop_asegurados ? 'Si' : 'No'}`;
  }

  public getDatosDNIContrario () {
    const [apellido1, apellido2] = this.contrario.apellidos.split(' ');
    return `DatosDNIContrario: nom: ${this.contrario.nombre} , Apel1= ${apellido1 || ''} , apel2= ${apellido2 || ''}`;
  }

  get url_audioAccidente(): string {
    return this._url_audioAccidente;
  }

  set url_audioAccidente(value: string) {
    this._url_audioAccidente = value;
  }

  get asegurado(): Insured {
    return this._asegurado;
  }

  set asegurado(value: Insured) {
    this._asegurado = value;
  }

  get contrario(): Insured {
    return this._contrario;
  }

  set contrario(value: Insured) {
    this._contrario = value;
  }

  get matricula_coche_asegurado(): string {
    return this._matricula_coche_asegurado;
  }

  set matricula_coche_asegurado(value: string) {
    this._matricula_coche_asegurado = value;
  }

  get matricula_coche_contrario(): string {
    return this._matricula_coche_contrario;
  }

  set matricula_coche_contrario(value: string) {
    this._matricula_coche_contrario = value;
  }

  get base64_accidentes(): string[] {
    return this._base64_accidentes;
  }

  set base64_accidentes(values: string[]) {
    this._base64_accidentes = values;
  }

  get urlVideoAccidente(): string {
    return this._urlVideoAccidente;
  }

  set urlVideoAccidente(value: string) {
    this._urlVideoAccidente = value;
  }

  get path_audioAccidente(): string {
    return this._path_audioAccidente;
  }

  set path_audioAccidente(value: string) {
    this._path_audioAccidente = value;
  }

  get audioFileName(): string {
    return this._audioFileName;
  }

  set audioFileName(value: string) {
    this._audioFileName = value;
  }

  get parteEnviado(): boolean {
    return this._parteEnviado;
  }

  set parteEnviado(value: boolean) {
    this._parteEnviado = value;
  }

  /**
   * CAUTION!! Invoking this method could result on fatal errors in the app data-flow
   */
  reset() {

    this.asegurado = new Insured();
    this.contrario = new Insured();

    this.base64_accidentes = [];
    this.parteEnviado = false;
    this.path_audioAccidente = '';
    this.url_audioAccidente = '';
    this.audioFileName = '';
    this.matricula_coche_asegurado = '';
    this.matricula_coche_contrario = '';

  }
}
