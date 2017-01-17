/**
 * Created by sergiodiazpinilla on 16/01/17.
 */

//Año de cotizacion o tiempos de servicios 365.25 dias
const tiempoServicio = 356.25;

//Fecha constante de agosto IPCP
const constDate = "1 Ags 1954";

let valores = {

};

let interpolacion = (F1,F2,F0)=>{
    let v1 = valores[F1];
    let v0 = valores[F0];
    let v2 = valores[F2];
    let t1 = diasEntre(F1,F0);
    let t2 = diasEntre(F0,F2);

    return (t1*v2 + t2*v1)/(t1+t2);
};

//IPC pensional
function IPCP(F){
    if(fechaAntes(F,constDate)){
        return 1000000;
    }else {
        if (ultimoDia(F)) {
            let dif = mesDe(F) - mesDe(constDate);
            let res = 1;
            //todo cambiar for por arreglo de meses y recorrerlos
            for (let i = 0; i < dif; i++) {
                res *= (1 + VIPC[mes] / 100);
            }
            return res;
        } else {
            //todo si mesDespues de VIPC no existe reddifinir

            return interpolacion(VIPC[mesAntes(F)],VIPC[mesDespues(F)]);
        }
    }
}

function VIPCR(F) {
    let ultimosMeses = ultimosMeses(F);
    let res = 1;
    for(let i = 0;i< 12;i++){

    }
}
/** todo Notas para tener en cuenta
 *
 *  Guardar salarios minimos en la base de datos ya que este toca ir actualizandolo constantemente
 *
 *  Guardar VIPC porque varia mensualmente, tener en cuenta metodo de actualizacion
 *
 *
 *
 *
 * */