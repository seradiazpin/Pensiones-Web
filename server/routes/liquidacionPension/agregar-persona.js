/**
 * Created by sergiodiazpinilla on 11/01/17.
 */
const S = require('string');

const mongoUtil = require("../../mongoUtil");
const Persona = require("../../models/Persona").Persona;
const Informacion = require("../../models/Informacion").Informacion;
const LiquidadorPension = require("../../models/LiquidadorPension").LiquidadorPension;


module.exports =(request, response) => {
    let newPerson = request.body.persona || {};
    let newPersonClass = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
    for(let i = 0;i<newPerson.datosPension.length;i++){
        let ibc = S(newPerson.datosPension[i].IBC).replaceAll("$ ","").replaceAll(".","").replaceAll(",",".").replaceAll('\\\"','"').s;
        newPersonClass.datosPension.push(new Informacion(newPerson.datosPension[i].fechaDesde,newPerson.datosPension[i].fechaHasta,ibc));
    }
    let persons = mongoUtil.personas();
    let lq = new LiquidadorPension(newPersonClass);
    lq.calcularPension();
    persons.insert(newPersonClass, (err, res) => {
        if(err){
            response.sendStatus(400);
        }
        response.sendStatus(201);
    });
};
