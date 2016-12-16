/**
 * Created by sergiodiazpinilla on 15/12/16.
 */

class Persona{
    constructor(nombre, documento, genero, regimen){
        this.nombre = nombre;
        this.documento = documento;
        this.genero = genero;
        this.regimen = regimen || "NODEFINIDO";
        this.datosDecision = new DatosDecision();
        this.datosLiquidacion = new DatosLiquidacion();
        this.datosPension ={
            data:[]
        }

    }
    toString(){
        return '\nNombre: '+this.nombre+ '\nDocumento: '+this.documento+'\nGenero: '+this.genero+
            '\nRegimen: '+this.regimen + '\nDatosDecicion\n----------------'+this.datosDecision+
            '\n-------------------\nDatosLiquidacion\n----------------'+this.datosLiquidacion;
    }
}

class DatosDecision{
    constructor(edad1994, totalSemanasCotizadas, semanas1994, semanas2005){
        this.edad1994 = edad1994 || 0;
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
        //TODO Se podrian calcular en el constructor !!!
        this.year = 0;
        this.diasEntre = 0;
        //TODO HASTA ACA
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
    }
    calcularPension(){
        if(this.validaciones()){

        }
    }
    validaciones(){
        for(let i = 0;i < this.persona.datosDecision;i++){
            let row = this.persona.datosPension[i];
            if(mayorFecha(row.fechaDesde,this.persona.datosPension[this.persona.datosPension.length-1])){
                //TODO mensjage error
                console.log("Fecha Inicial menor a Fecha Final fila anterior Fila-"+i);
                return false;
            }
            if(i > 0){
                let lastRow = this.persona.datosPension[i-1];
                if(menorFecha(row.fechaDesde,lastRow.fechaHasta)){
                    //TODO mensjage error
                    console.log("Fecha Inicial menor a Fecha Final fila anterior Fila-"+i);
                    return false;
                }
                if(menorFecha(row.fechaDesde,lastRow.fechaDesde)){
                    //TODO mensjage error
                    console.log("Fecha Inicial menor a Fecha Inicial fila anterior Fila-"+i);
                    return false;
                }
            }
        }
        return true;
    }
    /*
    * For J = filainicial To filafinal
     With Worksheets("HL")
     'AÑO FECHA FINAL DEL PERÍODO PARA DETERMINAR EL IPC PARA ACTUALIZACIÓN SALARIO
     .Cells(J, "C") = Year(.Cells(J, "B"))

     'No DE DIAS DEL PERRÍODO
     .Cells(J, "D") = (.Cells(J, "B") - .Cells(J, "A")) + 1

     'No DE SEMANAS ACUMULADAS
     If J = filainicial Then
     .Cells(J, "E") = .Cells(J, "D") / 7
     Else
     .Cells(J, "E") = .Cells(J - 1, "E") + (.Cells(J, "D") / 7)
     End If

     'IPC DE CADA AÑO
     .Cells(J, "G") = BUSCAIPC(.Cells(J, "C"))

     'ACTUALIZA IBC
     .Cells(J, "H") = .Cells(J, "F") * .Cells(J, "G")

     'DETERMINA IBL PARA PERIODO
     .Cells(J, "I") = .Cells(J, "H") * .Cells(J, "D")


     End With

     Next 'fin for i = 25 To filafinal*/
    calculos(){

    }
    regimen(){

    }
    liquidacion(){

    }
    resumen(){

    }
}

let pepe = new Persona("Pepe","123412312","Masculino");
console.log(pepe.toString());
pepe.datosDecicion.edad1994=41;
console.log(pepe.toString());
pepe.datosPension.data.push(new Informacion("10/10/10","10/10/11",1000));
console.log("DATOS")
for(let i = 0;i<pepe.datosPension.data.length;i++){
    console.log(pepe.datosPension.data[i].toString());
}