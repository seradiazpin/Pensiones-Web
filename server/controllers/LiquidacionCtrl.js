/**
 * Created by sergiodiazpinilla on 10/01/17.
 */
const S = require('string');

const mongoUtil = require("../mongoUtil");
const PersonaModel = require('../models2/Persona');
const Persona = require("../models/Persona").Persona;
const Informacion = require("../models/Informacion").Informacion;
const LiquidadorPension = require("../models/LiquidadorPension").LiquidadorPension;

exports.getPersons = (request, response) => {
    PersonaModel.find({}, function(err, personas) {
        if (err) throw err;
        let nombresPersonas = personas.map((persona)=>[persona.nombre,persona.documento]);
        // object of all the users
        response.json(nombresPersonas);
    });
};
exports.getPerson = (request, response) => {
    let id = request.params.documento;
    //console.log("buscando: "+id);
    if(id == null || isNaN(Number(id))){
        response.sendStatus(404);
    }else{
        PersonaModel.findOne({ 'documento': id },function (err, person) {
            if (err) response.sendStatus(400);
            response.json(person);
        });
    }
};
exports.addPerson = (request, response) => {
    let newPerson = request.body.persona || {};
    let newPersonClass = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
    for(let i = 0;i<newPerson.datosPension.length;i++){
        let ibc = S(newPerson.datosPension[i].IBC).replaceAll("$ ","").replaceAll(".","").replaceAll(",",".").replaceAll('\\\"','"').s;
        newPersonClass.datosPension.push(new Informacion(newPerson.datosPension[i].fechaDesde,newPerson.datosPension[i].fechaHasta,ibc));
    }
    let lq = new LiquidadorPension(newPersonClass);
    lq.calcularPension();
    PersonaModel(newPersonClass).save((err, res) => {
        if(err){
            response.sendStatus(400);
        }
        response.sendStatus(201);
    });
};
//todo arreglar funcion de editar
exports.editPerson = (request, response) => {
    let newPerson = request.body.persona || {};
    let id = request.params.documento;

    console.log(newPerson._id);

    PersonaModel.findById(newPerson._id, function (err, person) {
        if (err) response.sendStatus(400);
        let editperson = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
        editperson.datosPension = newPerson.datosPension;
        editperson._id = person._id;
        let lq = new LiquidadorPension(editperson);
        lq.calcularPension();
        PersonaModel(editperson).save(function (err, updatedPerson) {
            if (err) response.sendStatus(400);
            response.send(updatedPerson);
        });
    });
};
