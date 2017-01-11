/**
 * Created by sergiodiazpinilla on 11/01/17.
 */
const mongoUtil = require("../../mongoUtil");
const Persona = require("../../models/Persona").Persona;
const LiquidadorPension = require("../../models/LiquidadorPension").LiquidadorPension;

module.exports = (request, response) => {
    let newPerson = request.body.persona || {};
    let id = request.params.documento;
    let editPerson = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
    editPerson.datosPension = newPerson.datosPension;
    //let newPersonClass = new Persona(editPerson.nombre, editPerson.documento, editPerson.genero,editPerson.fechaNacimiento,null,editPerson.correo,editPerson.anotaciones,editPerson.tipoCotizacion,editPerson.fechaLiquidacion);
    //newPersonClass.datosPension = editPerson.datosPension;

    if(!editPerson.datosPension || !editPerson.nombre || !editPerson.documento){
        response.sendStatus(400);
    }
    delete editPerson["_id"];

    let persons = mongoUtil.personas();
    let query = {documento:id};
    let update = {$set:editPerson};
    let lq = new LiquidadorPension(editPerson);
    lq.calcularPension();
    persons.update(query, update,(err, res) => {
        if(err){
            response.sendStatus(400);
        }else {
            response.sendStatus(201);
        }
    });
};