/**
 * Created by Seradiazpin on 17/01/2017.
 */


let Dx = (genero,edad) =>{
    //Se tiene que acceder a la tabla M80 de masculino
    if(genero == "Masculino"){
        //todo no estoy seguro que es el inv
        return M80[edad] * Match.pow(inv(1 + tipoInteres/100),edad);
    }else{
        return F80[edad] * Match.pow(inv(1 + tipoInteres/100),edad);
    }
};

let R = (N,genero) =>{
    let res = 0;
    for(let i =0;i<=N;i++){
        res += Dx(genero,i);
    }

};

let NX = (N,max,genero) =>{
    let res = 0;
    for(let i =N;i<=max;i++){
        res += Dx(genero,i);
    }

};
