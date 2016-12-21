/**
 * Created by sergiodiazpinilla on 15/12/16.
 */

let moment = require("moment");
let S = require('string');
class Persona{
    constructor(nombre, documento, genero, regimen,fechaNacimiento,tipoCotizacion,fecchaLiquidacion){
        this.nombre = nombre;
        this.documento = documento;
        this.genero = genero;
        this.fechaNacimiento = moment(fechaNacimiento,"DD/MM/YYYY");
        this.regimen = regimen || "NODEFINIDO";
        this.tipoCotizacion = tipoCotizacion || 1;
        this.fechaLiquidacion = fecchaLiquidacion;
        this.datosDecision = new DatosDecision(this.fechaNacimiento);
        this.datosLiquidacion = new DatosLiquidacion();
        this.datosPension = [];


    }
    toString(){
        return '\nNombre: '+this.nombre+ '\nDocumento: '+this.documento+'\nGenero: '+this.genero+
            '\nRegimen: '+this.regimen + '\nDatosDecicion\n----------------'+this.datosDecision+
            '\n-------------------\nDatosLiquidacion\n----------------'+this.datosLiquidacion;
    }
}

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
                '\nsemanas1994'+this.semanas1994 + '\nsemanas2005: '+this.semanas2005;
    }
}

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
            '\nNumeroSalariosMinimos: '+this.nSalariosMin + '\nValorPensionDecreto758: '+this.valorPensionDecreto +
            '\nValorPensionley797: '+this.valorPensionLey + '\nvalorPensionPublicos: '+this.valorPensionPublicos +
            '\nValorPensionAportes: '+ this.valorPensionAportes + '\nFechaCumplimiento: '+this.fechaCumplimiento;
    }
}

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

class LiquidadorPension{
    constructor(persona) {
        this.persona = persona || new Persona("nombre", 1234, "Masculino", "NOREGIMEN");
        this.datosDecision = this.persona.datosDecision;
        this.datosLiquidacion = this.persona.datosLiquidacion;
        this.fechatr = "4/1/1994";
        this.fechatr2 = "7/25/2003";
        this.regimentr = false;
        this.ipcData = {
            "1968": 785.70175914,
            "1969": 738.02532326,
            "1970": 677.70920410,
            "1971": 633.01812451,
            "1972": 560.98734891,
            "1973": 494.13137400,
            "1974": 403.40548127,
            "1975": 322.72438501,
            "1976": 274.61230855,
            "1977": 218.64037305,
            "1978": 171.54992001,
            "1979": 143.25671817,
            "1980": 111.21552533,
            "1981": 88.29431988,
            "1982": 69.87521358,
            "1983": 56.33734869,
            "1984": 48.30019607,
            "1985": 40.83547182,
            "1986": 33.34869075,
            "1987": 27.57229495,
            "1988": 22.23213591,
            "1989": 17.35258813,
            "1990": 13.75879173,
            "1991": 10.39497713,
            "1992": 8.19663864,
            "1993": 6.55049840,
            "1994": 5.34298401,
            "1995": 4.35841750,
            "1996": 3.64843253,
            "1997": 2.99961566,
            "1998": 2.54895960,
            "1999": 2.18419846,
            "2000": 1.99963239,
            "2001": 1.83874243,
            "2002": 1.70807471,
            "2003": 1.59648071,
            "2004": 1.49918369,
            "2005": 1.42102719,
            "2006": 1.35529537,
            "2007": 1.29718163,
            "2008": 1.22734566,
            "2009": 1.13991424,
            "2010": 1.11756298,
            "2011": 1.08322476,
            "2012": 1.04427336,
            "2013": 1.01940000,
            "2014": 1.00000000
        };
        this.decreto748 = [
            [1050, 1099, 0.78],
            [1100, 1149, 0.81],
            [1150, 1199, 0.84],
            [1200, 1249, 0.87],
            [1250, 0, 0.90]
        ];
        this.leydata = {
            2004: [
                [1.050, 1.099, 0.67],
                [1.100, 1.149, 0.69],
                [1.150, 1.199, 0.71],
                [1.200, 1.249, 0.73],
                [1.250, 1.299, 0.76],
                [1.300, 1.349, 0.79],
                [1.350, 1.399, 0.82],
                [1.400, 0, 0.85]
            ],
            2005: [
                [1.100, 1.149, 0.665],
                [1.150, 1.199, 0.680],
                [1.200, 1.249, 0.695],
                [1.250, 1.299, 0.710],
                [1.300, 1.349, 0.725],
                [1.350, 1.399, 0.740],
                [1.400, 1.449, 0.755],
                [1.450, 1.499, 0.770],
                [1.500, 1.549, 0.785],
                [1550, 0, 0.800]
            ],
            2006: [
                [1.125, 1.174, 0.665],
                [1.175, 1.224, 0.680],
                [1.225, 1.274, 0.695],
                [1.275, 1.324, 0.710],
                [1.325, 1.374, 0.725],
                [1.375, 1.424, 0.740],
                [1.425, 1.474, 0.755],
                [1.475, 1.524, 0.770],
                [1.525, 1.574, 0.785],
                [1.575, 0, 0.800]
            ],
            2007: [
                [1.150, 1.199, 0.665],
                [1.200, 1.249, 0.680],
                [1.250, 1.299, 0.695],
                [1.300, 1.349, 0.710],
                [1.350, 1.399, 0.725],
                [1.400, 1.449, 0.740],
                [1.450, 1.499, 0.755],
                [1.500, 1.549, 0.770],
                [1.550, 1.599, 0.785],
                [1.600, 0, 0.800]
            ],
            2008: [
                [1.175, 1.224, 0.665],
                [1.225, 1.274, 0.680],
                [1.275, 1.324, 0.695],
                [1.325, 1.374, 0.710],
                [1.375, 1.424, 0.725],
                [1.425, 1.474, 0.740],
                [1.475, 1.524, 0.755],
                [1.525, 1.574, 0.770],
                [1.575, 1.624, 0.785],
                [1.625, 0, 0.800]
            ],
            2009: [
                [1.200, 1.249, 0.665],
                [1.250, 1.299, 0.680],
                [1.300, 1.349, 0.695],
                [1.350, 1.399, 0.710],
                [1.400, 1.449, 0.725],
                [1.450, 1.499, 0.740],
                [1.500, 1.549, 0.755],
                [1.550, 1.599, 0.770],
                [1.600, 1.649, 0.785],
                [1.650, 0, 0.800]
            ],
            2010: [
                [1.125, 1.174, 0.665],
                [1.175, 1.224, 0.680],
                [1.225, 1.274, 0.695],
                [1.275, 1.324, 0.710],
                [1.325, 1.374, 0.725],
                [1.375, 1.424, 0.740],
                [1.425, 1.474, 0.755],
                [1.475, 1.524, 0.770],
                [1.525, 1.574, 0.785],
                [1.575, 1.624, 0.800]
            ],
            2011: [
                [1.250, 1.299, 0.665],
                [1.300, 1.349, 0.680],
                [1.350, 1.399, 0.695],
                [1.400, 1.449, 0.710],
                [1.450, 1.499, 0.725],
                [1.500, 1.549, 0.740],
                [1.550, 1.599, 0.755],
                [1.600, 1.649, 0.770],
                [1.650, 1.699, 0.785],
                [1.700, 1.749, 0.800]
            ],
            2012: [
                [1.125, 1.174, 0.665],
                [1.175, 1.224, 0.680],
                [1.225, 1.274, 0.695],
                [1.275, 1.324, 0.710],
                [1.325, 1.374, 0.725],
                [1.375, 1.424, 0.740],
                [1.425, 1.474, 0.755],
                [1.475, 1.524, 0.770],
                [1.525, 1.574, 0.785],
                [1.575, 1.624, 0.800]
            ],
            2013: [
                [1.125, 1.174, 0.665],
                [1.175, 1.224, 0.680],
                [1.225, 1.274, 0.695],
                [1.275, 1.324, 0.710],
                [1.325, 1.374, 0.725],
                [1.375, 1.424, 0.740],
                [1.425, 1.474, 0.755],
                [1.475, 1.524, 0.770],
                [1.525, 1.574, 0.785],
                [1.575, 1.624, 0.800]
            ],
            2014: [
                [1.325, 1.374, 0.665],
                [1.375, 1.424, 0.680],
                [1.425, 1.474, 0.695],
                [1.475, 1.524, 0.710],
                [1.525, 1.574, 0.725],
                [1.575, 1.624, 0.740],
                [1.625, 1.674, 0.755],
                [1.675, 1.724, 0.770],
                [1.725, 1.774, 0.785],
                [1.775, 0, 0.800]
            ],
            2015: [
                [1.350, 1.399, 0.665],
                [1.400, 1.449, 0.680],
                [1.450, 1.499, 0.695],
                [1.500, 1.549, 0.710],
                [1.550, 1.599, 0.725],
                [1.600, 1.649, 0.740],
                [1.650, 1.699, 0.755],
                [1.700, 1.749, 0.770],
                [1.750, 1.799, 0.785],
                [1.800, 0, 0.800]
            ]
        };
        this.smv = {
            1991: 51720.0,
            1992: 65190.0,
            1993: 81510.0,
            1994: 98700.0,
            1995: 118170.0,
            1996: 142125.0,
            1997: 172005.0,
            1998: 203825.0,
            1999: 236438.0,
            2000: 260100.0,
            2001: 286000.0,
            2002: 309000.0,
            2003: 332000.0,
            2004: 358000.0,
            2005: 381500.0,
            2006: 408000.0,
            2007: 433700.0,
            2008: 461500.0,
            2009: 496900.0,
            2010: 515000.0,
            2011: 535600.0,
            2012: 566700.0,
            2013: 589500.0
        };
    }
    calcularPension(){

        if(this.validaciones()){
            this.calculos();
            this.regimentr = this.regimen();
            this.liquidacion();
            this.resumen();
        }
    }
    validaciones(){
        for(let i = 0;i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            if(this.mayorFecha(row.fechaDesde,this.persona.datosPension[this.persona.datosPension.length-1])){
                //TODO mensjage error
                console.log("Fecha Inicial menor a Fecha Final fila anterior Fila-"+i);
                return false;
            }
            if(i > 0){
                let lastRow = this.persona.datosPension[i-1];
                if(!this.mayorFecha(row.fechaDesde,lastRow.fechaHasta)){
                    //TODO mensjage error
                    console.log("Fecha Inicial menor a Fecha Final fila anterior Fila-"+i);
                    return false;
                }
                if(!this.mayorFecha(row.fechaDesde,lastRow.fechaDesde)){
                    //TODO mensjage error
                    console.log("Fecha Inicial menor a Fecha Inicial fila anterior Fila-"+i);
                    return false;
                }
            }
        }
        return true;
    }
    mayorFecha(a,b){
        return moment(a,"DD/MM/YYYY").diff(moment(b,"DD/MM/YYYY"))>0;
    }
    mayorIgualFecha(a,b){
        return moment(a,"DD/MM/YYYY").diff(moment(b,"DD/MM/YYYY"))>=0;
    }
    calculos(){
        for(let i = 0;i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            row.year = moment(row.fechaHasta,"DD/MM/YYYY").year();
            //Diferencia en dias
            row.diasEntre = Math.abs(moment(row.fechaDesde,"DD/MM/YYYY").diff(moment(row.fechaHasta,"DD/MM/YYYY"),"days"))+1;
            if(i == 0){
                row.semanasAcumuladas = row.diasEntre/7;
            }else{
                let lastRow = this.persona.datosPension[i-1];
                row.semanasAcumuladas =  lastRow.semanasAcumuladas + (row.diasEntre/7);
            }
            row.factorIPC = this.ipcData[row.year];
            row.salarioActualizado = row.IBC * row.factorIPC;
            row.IBLtlv = row.salarioActualizado * row.diasEntre;
        }
    }



    regimen(){
        //Si el regimen de trancicion es de ley 100
        for(let i = 0;i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            if(this.mayorIgualFecha(moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaDesde,"DD/MM/YYYY")) && moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaHasta,"DD/MM/YYYY")){
                if(this.fechatr === row.fechaHasta){
                    this.datosDecision.semanas1994 = row.semanasAcumuladas;
                    break;
                }
                if(i!=0){
                    let lastRow = this.persona.datosPension[i-1];
                    if(this.fechatr === row.fechaDesde && i!=0){
                        this.datosDecision.semanas1994 = lastRow.semanasAcumuladas;
                        this.datosDecision.semanas1994 += (1/7);
                        break;
                    }
                    if(this.mayorFecha(moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaDesde,"DD/MM/YYYY")) && !this.mayorIgualFecha(moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaHasta,"DD/MM/YYYY"))){
                        this.datosDecision.semanas1994 = lastRow.semanasAcumuladas;
                        this.datosDecision.semanas1994 += (moment(this.fechatr,"DD/MM/YYYY").diff(moment(row.fechaDesde,"DD/MM/YYYY"),"days")/7);
                        break;
                    }
                }
            }
            if(i != 0) {
                if (!this.mayorFecha(moment(this.fechatr,"DD/MM/YYYY"), moment(row.fechaDesde,"DD/MM/YYYY")) && !this.mayorFecha(moment(this.fechatr,"DD/MM/YYYY"), moment(row.fechaHasta,"DD/MM/YYYY"))) {
                    let lastRow = this.persona.datosPension[i - 1];
                    this.datosDecision.semanas1994 = lastRow.semanasAcumuladas;
                    break;
                }
            }
        }
        if(this.datosDecision.semanas1994 >= 750){
            return true;
        }
        //Regimen de transicion acto legislativo 1
        for(let i = 0;i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            if(this.mayorIgualFecha(moment(this.fechatr2,"DD/MM/YYYY"),moment(row.fechaDesde,"DD/MM/YYYY")) && moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaHasta,"DD/MM/YYYY")){
                if(this.fechatr2 === row.fechaHasta){
                    this.datosDecision.semanas2005 = row.semanasAcumuladas;
                    break;
                }
                if(i!=0){
                    let lastRow = this.persona.datosPension[i-1];
                    if(this.fechatr2 === row.fechaDesde && i!=0){
                        this.datosDecision.semanas2005 = lastRow.semanasAcumuladas;
                        this.datosDecision.semanas2005 += (1/7);
                        break;
                    }
                    if(this.mayorFecha(moment(this.fechatr2,"DD/MM/YYYY"),moment(row.fechaDesde,"DD/MM/YYYY")) && !this.mayorIgualFecha(moment(this.fechatr2,"DD/MM/YYYY"),moment(row.fechaHasta,"DD/MM/YYYY"))){
                        this.datosDecision.semanas2005 = lastRow.semanasAcumuladas;
                        this.datosDecision.semanas2005 += (moment(this.fechatr2,"DD/MM/YYYY").diff(moment(row.fechaDesde,"DD/MM/YYYY"),"days")/7);
                        break;
                    }
                }
            }
            if(!this.mayorFecha(moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaDesde,"DD/MM/YYYY")) && !this.mayorFecha(moment(this.fechatr,"DD/MM/YYYY"),moment(row.fechaHasta,"DD/MM/YYYY"))){
                if(i != 0) {
                    let lastRow = this.persona.datosPension[i - 1];
                }
                this.datosDecision.semanas2005 = lastRow.semanasAcumuladas;
                break;
            }
        }
        if(this.datosDecision.semanas2005 >= 750){
            return true;
        }
        return false;
    }

    liquidacion(){
        this.persona.datosDecision.totalSemanasCotizadas = this.persona.datosPension[this.persona.datosPension.length];
        switch (this.persona.tipoCotizacion){
            case 1:
                this.privado();
                break;
            case 2:
                this.publico();
                break;
            case 3:
                this.aportes();
                break;
            default:
                //todo Mensaje de error
                console.log("No definido");
                break;
        }
    }
    //Aportes hechos por funcionarios privados
    privado(){
        if(this.persona.datosDecision.totalSemanasCotizadas >= 1250){
            this.todaLaVida();
            this.diezYears();
            let valorpensiontv = this.persona.datosLiquidacion.pIBLtv * 0.9;
            let valorpension10 = this.persona.datosLiquidacion.pIBL10A * 0.9;
            if(valorpensiontv >= valorpension10){
                this.persona.regimen = "Decreto 758 de 1990 - IBL Toda la Vida";
            }else{
                this.persona.regimen = "Decreto 758 de 1990 - IBL 10 años >= 1250 semanas";
            }
        }else{
            this.diezYears();
            this.montoPension10();
            this.persona.regimen = "Decreto 758 de 1990 - IBL 10 años";
        }
        this.ley797();
        if(!this.regimentr){
            this.persona.regimen = "Ley 797 de 2003";
        }
    }
    //SI EL TIPO DE APORTE ES PRIVADO EJECUTA ESTE PROCEDIMIENTO PARA DETERMINARL EL PROMEDIO DEL IBL DE LOS DIEZ ÚLTIMOS AÑOS
    todaLaVida(){
        let diastv = 0 , totalibltv = 0;
        for(let i = 0; i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            diastv += row.diasEntre;
            totalibltv += row.IBLtlv;
        }
        this.persona.datosLiquidacion.pIBLtv = totalibltv/diastv;
    }
    //SI EL TIPO DE APORTE ES PRIVADO EJECUTA ESTE PROCEDIMIENTO PARA DETERMINARL EL PROMEDIO DEL IBL DE LOS DIEZ ÚLTIMOS AÑOS
    diezYears(){
        let totalibl10 = 0, diasDiezYears = 0, diasDiferencia = 0;
        for(let i = this.persona.datosPension.length-1; i >= 0;i--){
            let row = this.persona.datosPension[i];
            row.numDias10Y = row.diasEntre;
            row.IBL10Y = row.IBLtlv;
            totalibl10 += row.IBLtlv;
            diasDiezYears += row.diasEntre;
            if(diasDiezYears === 3650){
                totalibl10 = (totalibl10/diasDiezYears);
                break;
            }
            if(diasDiezYears > 3650){
                diasDiferencia  = diasDiezYears - 3650;
                row.numDias10Y = row.diasEntre - diasDiferencia;
                diasDiezYears = diasDiezYears - row.diasEntre + row.numDias10Y;
                if(diasDiezYears != 3650){
                    console.log("TOTAL DIAS != 3650 Dirección de Ahorro Individual y Prima Media");
                }
                row.IBL10Y = row.salarioActualizado * row.numDias10Y;
                totalibl10 = totalibl10 - row.IBLtlv + row.IBL10Y;
                break;
            }
            this.persona.datosLiquidacion.pIBL10A = totalibl10/diasDiezYears;
        }
    }
    montoPension10(){
        //todo quite valorpension10 por si acaso
        let porcentajepension =0;
        for(let i = 0;i<this.decreto748.length;i++){
            let row = this.decreto748[i];
            if(this.datosDecision.totalSemanasCotizadas >= row[0] && this.datosDecision.totalSemanasCotizadas <= row[1]){
                porcentajepension = row[2];
                break;
            }
            if(porcentajepension == 0){
                console.log("PORCENTAJE DE PENSIÓN NO HALLADO-Dirección de Ahorro Individual y Prima Media");
            }
        }
        this.datosLiquidacion.valorPensionDecreto = this.datosLiquidacion.pIBL10A * porcentajepension;
    }
    ley797(){
        let yeardata = this.leydata[moment(this.persona.fechaLiquidacion,"DD/MM/YYYY").year()];
        let porcentajeley = 0;
        if(this.datosDecision.totalSemanasCotizadas >= yeardata[0] && this.datosDecision.totalSemanasCotizadas <=yeardata[1]){
            porcentajeley = yeardata[2];
        }
        if(porcentajeley ===0){
            return 0;
        }
        this.datosLiquidacion.nSalariosMin = this.datosLiquidacion.pIBL10A/this.smv[moment(this.persona.fechaLiquidacion,"DD/MM/YYYY").year()];
        porcentajeley = porcentajeley * 100;
        this.datosLiquidacion.monto  = porcentajeley - (0.5 * this.datosLiquidacion.nSalariosMin);
        this.datosLiquidacion.montoLey = (this.datosLiquidacion.pIBL10A * this.datosLiquidacion.monto) / 100;

    }
    publico(){
        this.diezYears();
        this.ultimoYear();
    }
    ultimoYear(){
        let diasdiferencia = 0, totalibluy = 0, diasuy = 0;
        for(let i = this.persona.datosPension.length-1; i >= 0;i--){
            let row = this.persona.datosPension[i];
            row.numDiasuY = row.diasEntre;
            row.IBLuy = row.IBLtlv;
            totalibluy += row.IBLtlv;
            diasuy += row.diasEntre;
            if(diasuy === 365){
                totalibluy = (totalibluy/diasuy);
                break;
            }
            if(diasuy > 365){
                diasdiferencia = diasuy -365;
                row.numDiasuY = row.diasEntre - diasdiferencia;
                diasuy = diasuy - row.diasEntre + row.numDiasuY;
                if(diasuy != 365){
                    //todo mensaje de error
                    console.log("TOTAL DIAS != 360 Dirección de Ahorro Individual y Prima Media")
                }
                row.IBLuy = row.salarioActualizado * row.numDiasuY;
                totalibluy = totalibluy - row.IBLtlv + row.IBLuy;
                break;
            }
            this.datosLiquidacion.pIBLuA = totalibluy / diasuy;
            this.datosLiquidacion.valorPensionPublicos = this.datosLiquidacion.pIBLuA*0.75;
        }
    }
    aportes(){
        this.diezYears();
        this.datosLiquidacion.monto =0.75;
        this.datosLiquidacion.valorPensionAportes = this.datosLiquidacion.pIBL10A * this.datosLiquidacion.monto;
        this.datosLiquidacion.valorPensionDecreto = this.datosLiquidacion.valorPensionAportes;
    }
    resumen(){
        for(let i = 0;i<this.persona.datosPension.length;i++){
            //console.log("|"+i+this.persona.datosPension[i].toString());
            console.log(this.persona.toString());git
        }
    }
}

let pepe = new Persona("Pepe","123412312","Masculino","NOREGIMEN","2/11/1952",1,"27/02/14");
console.log(pepe.toString());
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
    let ipc = S(dataExample[i][2]).replaceAll("$ ","").replaceAll(".","").replaceAll(",",".");
    pepe.datosPension.push(new Informacion(fehaDesde,fechaHasta,ipc));
}
console.log("DATOS");
for(let i = 0;i<pepe.datosPension.length;i++){
    console.log("|"+i+pepe.datosPension[i].toString());
}

let lq = new LiquidadorPension(pepe);
lq.calcularPension();
console.log("------------------------------\n\n\nDATOS");

