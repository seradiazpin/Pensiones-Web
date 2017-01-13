/**
 * Created by sergiodiazpinilla on 10/01/17.
 */
/**
 * pIBLtv => promedioIBLtodaVida
 * pIBL10A => promedioIBLultimos10years
 * pIBLuA =>promedioIBLultimoYear
 * monto
 * montoLey => montoLey797
 * nSalariosMin
 * valorPensionDecreto
 * valorPensionLey
 * valorPensionPublicos
 * valorPensionAportes
 * fechaCumplimiento
 */

class DatosLiquidacion{
    constructor(){
        this.pIBLtv = 0;
        this.pIBL10A = 0;
        this.pIBLuA = 0;
        this.monto = 0;
        this.montoLey = 0;
        this.nSalariosMin = 0;
        this.valorPensionDecreto = 0;
        this.valorPensionLey = 0;
        this.valorPensionPublicos = 0;
        this.valorPensionAportes = 0;
        this.fechaCumplimiento = "10/10/10";
    }
    toString(){
        return '\npromedioIBLtodaVida: '+this.pIBLtv + '\npromedioIBLultimos10years: '+this.pIBL10A +
            '\npromedioIBLultimoYear: '+this.pIBLuA +'\nMonto:'+this.monto+'\nMontoLey797: '+this.montoLey+
            '%\nNumeroSalariosMinimos: '+this.nSalariosMin + '\nValorPensionDecreto758: '+this.valorPensionDecreto +
            '\nValorPensionley797: '+this.valorPensionLey + '\nvalorPensionPublicos: '+this.valorPensionPublicos +
            '\nValorPensionAportes: '+ this.valorPensionAportes + '\nFechaCumplimiento: '+this.fechaCumplimiento;
    }
}

module.exports = {
    DatosLiquidacion : DatosLiquidacion
};