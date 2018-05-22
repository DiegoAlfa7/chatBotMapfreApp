import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { ParteService } from "../../services/parte.service";
import { Insured } from "../../app/classes/Insured";

/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  private asegurado1: Insured;
  private asegurado2: Insured;

  private base64_matricula1: string;
  private base64_matricula2: string;

  private base64_accidente: string;

  public fechaDef: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public parte: ParteService) {
    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidente = this.parte.base64_accidente;

    /*
    let fecha_carta_verde = new Date(this.asegurado1.c_verde_val).toISOString();

    let fechaSplit = fecha_carta_verde.split("T");

    let fechaCasi = fechaSplit[0].split("-");

    fechaCasi[2].concat("/");
    fechaCasi[1].concat("/");

    this.fechaDef = fechaCasi[1].concat("-") + fechaCasi[2].concat("-") + fechaCasi[0];

    console.log("FECHA C_VERDE_VAL: " + this.asegurado1.c_verde_val);
    console.log("FECHA DEF: " + this.fechaDef);
*/
  }

  ionViewWillEnter() {

    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidente = this.parte.base64_accidente;



    console.log(this.asegurado1);

  }

  public printInsured() {


    console.log(this.asegurado1);

  }

}
