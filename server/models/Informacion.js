/**
 * Created by sergiodiazpinilla on 10/01/17.
 */
class Informacion{
    constructor(fechaDesde, fechaHasta, IBC){
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.IBC = IBC;
        this.year = 0;
        this.diasEntre = 0;
        this.semanasAcumuladas = 0;
        this.factorIPC = 0;
        this.salarioActualizado = 0;
        this.IBLtlv = 0;
        this.numDias10Y = 0;
        this.IBL10Y = 0;
        this.numDiasuY= 0;
        this.IBLuy = 0;
    }
    toString(){
        return '|'+ this.fechaDesde + '|' +this.fechaHasta + '|' +this.IBC + '|' +this.year + '|' +this.diasEntre +
            '|' + this.semanasAcumuladas + '|' +this.factorIPC + '|' +this.salarioActualizado + '|' +this.IBLtlv +
            '|' +this.numDias10Y + '|' +this.IBL10Y + '|' +this.numDiasuY+ '|' +this.IBLuy;
    }
}

module.exports = {
    Informacion : Informacion
};