/**
 * Created by sergiodiazpinilla on 10/01/17.
 */
"use strict";
let moment = require("moment");
let DatosDecision = require("./DatosDecision").DatosDecision;
let DatosLiquidacion = require("./DatosLiquidacion").DatosLiquidacion;
let LiquidadorPension = require("./LiquidadorPension").LiquidadorPension;
let Informacion = require("./Informacion").Informacion;

class Persona{
    constructor(nombre, documento, genero,fechaNacimiento,regimen,correo,anotaciones,tipoCotizacion,fechaLiquidacion){
        this.nombre = nombre;
        this.documento = documento;
        this.genero = genero;
        this.fechaNacimiento = moment(fechaNacimiento).format("DD/MM/YYYY");
        this.regimen = regimen || "NODEFINIDO";
        this.correo = correo || "Sin email";
        this.anotaciones = anotaciones || "";
        this.tipoCotizacion = tipoCotizacion || "1";
        this.fechaLiquidacion = moment(fechaLiquidacion).format("DD/MM/YYYY");
        this.datosDecision = new DatosDecision(moment(this.fechaNacimiento,"DD/MM/YYYY"));
        this.datosLiquidacion = new DatosLiquidacion();
        this.datosPension = [];


    }
    toString(){
        return '\nNombre: '+this.nombre+ '\nDocumento: '+this.documento+'\nGenero: '+this.genero+
            '\nRegimen: '+this.regimen + '\nDatosDecicion\n----------------'+this.datosDecision+
            '\n-------------------\nDatosLiquidacion\n----------------'+this.datosLiquidacion+this.correo+this.anotaciones;
    }
}

module.exports = {
    Persona : Persona
};

/*test
let S = require('string');
let d1 = new Date("1952-11-2");
let d2 = new Date("2014-02-27");
console.log(d1);
console.log(d2);
//editPerson.nombre, editPerson.documento, editPerson.genero,editPerson.fechaNacimiento,null,editPerson.correo,editPerson.anotaciones,editPerson.tipoCotizacion,editPerson.fechaLiquidacion
let pepe = new Persona("PEPE", 1032458183, "Masculino",d1,null,"","","1",d2);
let dataExample = [
    ["9/02/71","31/12/71","$ 1.290,00 "],
    ["1/01/72","30/06/72","$ 1.290,00 "],
    ["1/07/72","1/07/72","$ 1.290,00 "],
    ["10/07/72","31/12/72","$ 4.410,00 "],
    ["1/01/73","31/07/73","$ 4.410,00 "],
    ["1/08/73","31/12/73","$ 5.790,00 "],
    ["1/01/74","31/12/74","$ 5.790,00 "],
    ["1/01/75","12/01/75","$ 5.790,00 "],
    ["13/01/75","31/01/75","$ 13.260,00 "],
    ["1/02/75","31/07/75","$ 7.470,00 "],
    ["1/08/75","31/12/75","$ 9.480,00 "],
    ["1/01/76","29/02/76","$ 9.480,00 "],
    ["1/03/76","9/05/76","$ 11.850,00 "],
    ["12/05/76","31/12/76","$ 9.480,00 "],
    ["1/01/77","31/05/77","$ 9.480,00 "],
    ["1/06/77","31/08/77","$ 11.850,00 "],
    ["1/09/77","31/12/77","$ 17.790,00 "],
    ["1/01/78","8/05/78","$ 17.790,00 "],
    ["9/05/78","1/06/78","$ 25.530,00 "],
    ["2/06/78","31/12/78","$ 25.530,00 "],
    ["1/01/79","30/09/79","$ 25.530,00 "],
    ["1/10/79","31/12/79","$ 25.530,00 "],
    ["1/01/80","31/03/80","$ 25.530,00 "],
    ["15/10/81","31/12/81","$ 47.370,00 "],
    ["1/01/82","2/09/82","$ 47.370,00 "],
    ["6/09/82","30/10/82","$ 61.950,00 "],
    ["17/11/82","31/12/82","$ 79.290,00 "],
    ["1/01/83","30/09/83","$ 79.290,00 "],
    ["1/10/83","31/12/83","$ 79.290,00 "],
    ["1/01/84","31/03/84","$ 79.290,00 "],
    ["1/04/84","30/04/84","$ 136.290,00 "],
    ["1/05/84","15/10/84","$ 150.270,00 "],
    ["5/02/85","11/02/85","$ 14.610,00 "],
    ["12/02/85","31/05/85","$ 93.900,00 "],
    ["1/06/85","31/12/85","$ 165.180,00 "],
    ["1/01/86","31/12/86","$ 165.180,00 "],
    ["1/01/87","28/02/87","$ 165.180,00 "],
    ["1/03/87","31/12/87","$ 165.180,00 "],
    ["1/01/88","29/02/88","$ 165.180,00 "],
    ["1/03/88","16/06/88","$ 89.070,00 "],
    ["17/06/88","30/06/88","$ 130.110,00 "],
    ["1/07/88","31/08/88","$ 41.040,00 "],
    ["11/10/93","31/12/93","$ 977.550,00 "],
    ["1/01/94","28/02/94","$ 977.550,00 "],
    ["1/03/94","31/03/94","$ 1.000.000,00 "],
    ["1/04/94","31/12/94","$ 1.000.000,00 "],
    ["1/01/95","30/11/95","$ 1.000.000,00 "],
    ["1/12/95","30/12/95","$ 1.500.000,00 "],
    ["1/01/96","30/11/96","$ 1.000.000,00 "],
    ["1/12/96","30/12/96","$ 1.500.000,00 "],
    ["1/01/97","30/11/97","$ 1.000.000,00 "],
    ["1/12/97","30/12/97","$ 1.500.000,00 "],
    ["1/01/98","30/08/98","$ 1.000.000,00 "],
    ["1/09/98","30/09/98","$ 2.000.000,00 "],
    ["1/10/98","30/11/98","$ 1.000.000,00 "],
    ["1/12/98","30/12/98","$ 1.500.000,00 "],
    ["1/01/99","30/07/99","$ 1.000.000,00 "],
    ["1/08/99","6/08/99","$ 1.000.000,00 "],
    ["1/10/99","30/11/99","$ 1.000.000,00 "],
    ["1/12/99","30/12/99","$ 1.500.000,00 "],
    ["1/01/00","30/05/00","$ 1.000.000,00 "],
    ["1/06/00","30/06/00","$ 5.202.000,00 "],
    ["1/07/00","30/12/00","$ 2.800.000,00 "],
    ["1/01/01","1/01/01","$ 93.000,00 "],
    ["1/08/07","30/12/07","$ 1.701.000,00 "],
    ["1/01/08","29/01/08","$ 1.701.000,00 "],
    ["1/02/08","30/03/08","$ 1.701.000,00 "],
    ["1/04/08","29/04/08","$ 1.701.000,00 "],
    ["1/05/08","30/11/08","$ 1.701.000,00 "],
    ["1/01/09","28/02/09","$ 1.701.000,00 "],
    ["1/04/09","30/04/09","$ 1.701.000,00 "],
    ["1/06/09","30/10/09","$ 1.701.000,00 "],
    ["1/12/09","30/12/09","$ 1.701.000,00 "],
    ["1/01/10","30/01/10","$ 1.701.000,00 "],
    ["1/03/10","30/12/10","$ 1.701.000,00 "],
    ["1/01/11","30/12/11","$ 1.701.000,00 "],
    ["1/01/12","30/12/12","$ 1.701.000,00 "],
    ["1/01/13","30/12/13","$ 1.701.000,00 "]
];
for(let i = 0;i<dataExample.length;i++){
    let fehaDesde = dataExample[i][0];
    let fechaHasta = dataExample[i][1];
    let ipc = S(dataExample[i][2]).replaceAll("$ ","").replaceAll(".","").replaceAll(",",".").s;
    pepe.datosPension.push(new Informacion(fehaDesde,fechaHasta,ipc));
}
//console.log("DATOS");

let lq = new LiquidadorPension(pepe);
lq.calcularPension();
//console.log("------------------------------\n\n\nDATOS");
console.log(pepe.datosPension);
*/