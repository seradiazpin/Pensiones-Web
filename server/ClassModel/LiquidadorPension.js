/**
 * Created by sergiodiazpinilla on 10/01/17.
 *
 */

/**
 * {
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
            "2014": 1.16554772,
            "2015": 1.12439487,
            "2016": 1.05310000,
            "2017": 1.00000000
        };
 */

"use strict";
let moment = require("moment");
let CalcularIPC = require("./CalcularIPC").CalcularIPC;

class LiquidadorPension{
    constructor(persona) {
        let calcipc = new CalcularIPC();
        calcipc.factorAnual();
        this.persona = persona || new Persona("nombre", 1234, "Masculino", "NOREGIMEN");
        this.datosDecision = this.persona.datosDecision;
        this.datosLiquidacion = this.persona.datosLiquidacion;
        this.fechatr = "1/4/1994";
        this.fechatr2 = "25/7/2003";
        this.regimentr = false;
        this.ipcData =  calcipc.IPC;
        this.decreto748 = [
            [1050, 1099, 0.78],
            [1100, 1149, 0.81],
            [1150, 1199, 0.84],
            [1200, 1249, 0.87],
            [1250, 0, 0.90]
        ];
        this.leydata = {
            2004: [
                [1050, 1099, 0.67],
                [1100, 1149, 0.69],
                [1150, 1199, 0.71],
                [1200, 1249, 0.73],
                [1250, 1299, 0.76],
                [1300, 1349, 0.79],
                [1350, 1399, 0.82],
                [1400, 0, 0.85]
            ],
            2005: [
                [1100, 1149, 0.665],
                [1150, 1199, 0.680],
                [1200, 1249, 0.695],
                [1250, 1299, 0.710],
                [1300, 1349, 0.725],
                [1350, 1399, 0.740],
                [1400, 1449, 0.755],
                [1450, 1499, 0.770],
                [1500, 1549, 0.785],
                [1550, 0, 0.800]
            ],
            2006: [
                [1125, 1174, 0.665],
                [1175, 1224, 0.680],
                [1225, 1274, 0.695],
                [1275, 1324, 0.710],
                [1325, 1374, 0.725],
                [1375, 1424, 0.740],
                [1425, 1474, 0.755],
                [1475, 1524, 0.770],
                [1525, 1574, 0.785],
                [1575, 0, 0.800]
            ],
            2007: [
                [1150, 1199, 0.665],
                [1200, 1249, 0.680],
                [1250, 1299, 0.695],
                [1300, 1349, 0.710],
                [1350, 1399, 0.725],
                [1400, 1449, 0.740],
                [1450, 1499, 0.755],
                [1500, 1549, 0.770],
                [1550, 1599, 0.785],
                [1600, 0, 0.800]
            ],
            2008: [
                [1175, 1224, 0.665],
                [1225, 1274, 0.680],
                [1275, 1324, 0.695],
                [1325, 1374, 0.710],
                [1375, 1424, 0.725],
                [1425, 1474, 0.740],
                [1475, 1524, 0.755],
                [1525, 1574, 0.770],
                [1575, 1624, 0.785],
                [1625, 0, 0.800]
            ],
            2009: [
                [1200, 1249, 0.665],
                [1250, 1299, 0.680],
                [1300, 1349, 0.695],
                [1350, 1399, 0.710],
                [1400, 1449, 0.725],
                [1450, 1499, 0.740],
                [1500, 1549, 0.755],
                [1550, 1599, 0.770],
                [1600, 1649, 0.785],
                [1650, 0, 0.800]
            ],
            2010: [
                [1125, 1174, 0.665],
                [1175, 1224, 0.680],
                [1225, 1274, 0.695],
                [1275, 1324, 0.710],
                [1325, 1374, 0.725],
                [1375, 1424, 0.740],
                [1425, 1474, 0.755],
                [1475, 1524, 0.770],
                [1525, 1574, 0.785],
                [1575, 1624, 0.800]
            ],
            2011: [
                [1250, 1299, 0.665],
                [1300, 1349, 0.680],
                [1350, 1399, 0.695],
                [1400, 1449, 0.710],
                [1450, 1499, 0.725],
                [1500, 1549, 0.740],
                [1550, 1599, 0.755],
                [1600, 1649, 0.770],
                [1650, 1699, 0.785],
                [1700, 1749, 0.800]
            ],
            2012: [
                [1125, 1174, 0.665],
                [1175, 1224, 0.680],
                [1225, 1274, 0.695],
                [1275, 1324, 0.710],
                [1325, 1374, 0.725],
                [1375, 1424, 0.740],
                [1425, 1474, 0.755],
                [1475, 1524, 0.770],
                [1525, 1574, 0.785],
                [1575, 1624, 0.800]
            ],
            2013: [
                [1125, 1174, 0.665],
                [1175, 1224, 0.680],
                [1225, 1274, 0.695],
                [1275, 1324, 0.710],
                [1325, 1374, 0.725],
                [1375, 1424, 0.740],
                [1425, 1474, 0.755],
                [1475, 1524, 0.770],
                [1525, 1574, 0.785],
                [1575, 1624, 0.800]
            ],
            2014: [
                [1325, 1374, 0.665],
                [1375, 1424, 0.680],
                [1425, 1474, 0.695],
                [1475, 1524, 0.710],
                [1525, 1574, 0.725],
                [1575, 1624, 0.740],
                [1625, 1674, 0.755],
                [1675, 1724, 0.770],
                [1725, 1774, 0.785],
                [1775, 0, 0.800]
            ],
            2015: [
                [1350, 1399, 0.665],
                [1400, 1449, 0.680],
                [1450, 1499, 0.695],
                [1500, 1549, 0.710],
                [1550, 1599, 0.725],
                [1600, 1649, 0.740],
                [1650, 1699, 0.755],
                [1700, 1749, 0.770],
                [1750, 1799, 0.785],
                [1800, 0, 0.800]
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
            2013: 589500.0,
            2014: 616000.0,
            2015: 644350.0,
            2016: 689455.0,
            2017: 737717.0,
            2018: 781242.0,
            2019: 828116.0,
            2020: 878000.0
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
                        this.datosDecision.semanas1994 += ((moment(this.fechatr,"DD/MM/YYYY").diff(moment(row.fechaDesde,"DD/MM/YYYY"),"days"))/7);
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
        this.persona.datosDecision.totalSemanasCotizadas = this.persona.datosPension[this.persona.datosPension.length-1].semanasAcumuladas;
        switch (this.persona.tipoCotizacion){
            case "1":
                this.privado();
                break;
            case "2":
                this.publico();
                break;
            case "3":
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
                this.datosLiquidacion.valorPensionDecreto = valorpensiontv;
                this.persona.regimen = "Decreto 758 de 1990 - IBL Toda la Vida";
            }else{
                this.datosLiquidacion.valorPensionDecreto = valorpension10;
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
                //totalibl10 = (totalibl10/diasDiezYears);
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
        }
        this.persona.datosLiquidacion.pIBL10A = totalibl10/diasDiezYears;
    }
    montoPension10(){
        //todo quite valorpension10 por si acaso
        let porcentajepension = 0;
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
        // Despues del 2015 todas son iguales
        let year = moment(this.persona.fechaLiquidacion,"DD/MM/YYYY").year();
        let yeardata = null;
        if(year >=2015){
            yeardata = this.leydata[2015];
        }else{
            yeardata = this.leydata[year];
        }
        //Para ver el año del IPC TODO
        //console.log(this.persona.fechaLiquidacion);
        //console.log("Year" + moment(this.persona.fechaLiquidacion,"DD/MM/YYYY").year());
        let porcentajeley = 0;
        for(let i = 0;i< yeardata.length;i++){
            if((this.datosDecision.totalSemanasCotizadas >= yeardata[i][0] && this.datosDecision.totalSemanasCotizadas <=yeardata[i][1]) || (this.datosDecision.totalSemanasCotizadas >= yeardata[i][0] && yeardata[i][1] === 0)){
                porcentajeley = yeardata[i][2];
                break;
            }
        }
        if(porcentajeley ===0){
            return 0;
        }

        this.datosLiquidacion.nSalariosMin = this.datosLiquidacion.pIBL10A/this.smv[moment(this.persona.fechaLiquidacion,"DD/MM/YYYY").year()];
        porcentajeley = porcentajeley * 100;
        this.datosLiquidacion.montoLey  = porcentajeley - (0.5 * this.datosLiquidacion.nSalariosMin);
        this.datosLiquidacion.valorPensionLey = (this.datosLiquidacion.pIBL10A * this.datosLiquidacion.montoLey) / 100;
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
        if(this.persona.fechaNacimiento === "Femenino"){
            this.datosLiquidacion.fechaCumplimiento = moment(this.persona.fechaNacimiento,"DD/MM/YYYY").add(55, 'years').format("DD/MM/YYYY").toString();
        }
        if(this.persona.genero === "Masculino"){
            this.datosLiquidacion.fechaCumplimiento = moment(this.persona.fechaNacimiento,"DD/MM/YYYY").add(60, 'years').format("DD/MM/YYYY").toString();
        }
        //for(let i = 0;i<this.persona.datosPension.length;i++){
        //console.log("|"+i+this.persona.datosPension[i].toString());
        //console.log(this.persona.toString());
        //}
    }
}

module.exports = {
    LiquidadorPension : LiquidadorPension
}
