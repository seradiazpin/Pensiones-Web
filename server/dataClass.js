/**
 * Created by sergiodiazpinilla on 15/12/16.
 */
let moment = require("moment");
let copareDates = require("compare-dates");
class Persona{
    constructor(nombre, documento, genero, regimen,fechaNacimiento){
        this.nombre = nombre;
        this.documento = documento;
        this.genero = genero;
        this.fechaNacimiento = moment(fechaNacimiento,"DD/MM/YYYY");
        this.regimen = regimen || "NODEFINIDO";
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
        console.log(year1994.year());
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
    constructor(persona){
        this.persona = persona || new Persona("nombre",1234,"Masculino","NOREGIMEN");
        this.datosDecision = this.persona.datosDecision;
        this.datosLiquidacion = this.persona.datosLiquidacion;
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
        }

    }
    calcularPension(){

        if(this.validaciones()){
            this.calculos();
        }
    }
    validaciones(){
        for(let i = 0;i < this.persona.datosPension.length;i++){
            console.log("Pencopn validacion++"+i);
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
    calculos(){
        for(let i = 0;i < this.persona.datosPension.length;i++){
            let row = this.persona.datosPension[i];
            row.year = moment(row.fechaHasta,"DD/MM/YYYY").year();
            //Diferencia en dias
            row.diasEntre = Math.abs(moment(row.fechaDesde,"DD/MM/YYYY").diff(moment(row.fechaHasta,"DD/MM/YYYY"),"days"));
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

    }
    liquidacion(){

    }
    resumen(){

    }
}

let pepe = new Persona("Pepe","123412312","Masculino","NOREGIMEN","2/11/1952");
console.log(pepe.toString());
let dataExample = [
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
    let ipc = dataExample[i][2].replace("$ ","").replace(".","").replace(",",".");
    pepe.datosPension.push(new Informacion(fehaDesde,fechaHasta,ipc));
}
console.log("DATOS");
for(let i = 0;i<pepe.datosPension.length;i++){
    console.log("|"+i+pepe.datosPension[i].toString());
}

let lq = new LiquidadorPension(pepe);
lq.calcularPension();
console.log("------------------------------\n\n\nDATOS");
for(let i = 0;i<pepe.datosPension.length;i++){
    console.log(pepe.datosPension[i].toString());
}

console.log(pepe.datosPension);