"use strict";
let moment = require("moment");
class DatosDecision{
    constructor(fechaNacimiento, totalSemanasCotizadas, semanas1994, semanas2005){
        let year1994 = moment("1/04/1994","DD/MM/YYYY");
        this.edad1994 = year1994.diff(fechaNacimiento,"years")|| 0;

        this.totalSemanasCotizadas = totalSemanasCotizadas || 0;
        this.semanas1994 = semanas1994 || 0;
        this.semanas2005 = semanas2005 || 0;
    }
    toString(){
        return '\nedad1994: '+ this.edad1994 + '\ntotalSemanasCotizadas: '+ this.totalSemanasCotizadas +
            '\nsemanas1994: '+this.semanas1994 + '\nsemanas2005: '+this.semanas2005;
    }
}

module.exports = {
    DatosDecision : DatosDecision
};