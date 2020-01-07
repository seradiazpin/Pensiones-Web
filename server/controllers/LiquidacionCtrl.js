/**
 * Created by sergiodiazpinilla on 10/01/17.
 */
const S = require('string');

const PersonaModel = require('../models/Persona');
const Persona = require("../ClassModel/Persona").Persona;
const Informacion = require("../ClassModel/Informacion").Informacion;
const LiquidadorPension = require("../ClassModel/LiquidadorPension").LiquidadorPension;

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
        let ibc = S(newPerson.datosPension[i].IBC).replaceAll("$","").replaceAll(".","").replaceAll(",",".").replaceAll('\\\"','"').s;
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

exports.editPerson = (request, response) => {
    let newPerson = request.body.persona || {};
    let id = request.params.documento;
    let editperson = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
    editperson.datosPension = newPerson.datosPension;
    console.log(newPerson._id);
    PersonaModel.findOneAndUpdate({"_id":newPerson._id}, editperson,{"new":true},function (err, updatedPerson) {
        if (err) response.sendStatus(400);
        response.send(updatedPerson);
    });
};

exports.deletePerson = (request, response) =>{
    let id = request.body.id || null;
    if(!id){
        response.sendStatus(400);
    }else{
        PersonaModel.remove({"documento":id},(err)=>{
            if (err) response.sendStatus(400);
            response.sendStatus(201);
        });
    }
};
