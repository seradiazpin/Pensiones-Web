/**
 * Created by sergiodiazpinilla on 14/12/16.
 */
"use strict";

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mongoUtil = require("./mongoUtil");
let S = require('string');
let Persona = require("./dataClass").Persona;
let Informacion = require("./dataClass").Informacion;
let LiquidadorPension = require("./dataClass").LiquidadorPension;

mongoUtil.connect();
app.use(express.static(__dirname + "/../client"));

/*
app.get("/sports", (request, response)=>{
    let sports = mongoUtil.sports();
    sports.find().toArray((err,doc) =>{
    let sportsNames = doc.map((sport)=>sport.name);
    response.json(sportsNames);
    });
});*/

app.get("/personas",(request,response)=>{
    let personas = mongoUtil.personas();
    personas.find().toArray((err,doc)=>{
        let nombresPersonas = doc.map((persona)=>[persona.nombre,persona.documento]);
        response.json(nombresPersonas);

    });
});

app.get("/:documento", (request,response)=>{
    let id = request.params.documento;
    console.log("Persona",id);
    let persona = mongoUtil.personas();
    persona.find({documento:id}).limit(1).next((err,doc) =>{
        if(err){
            response.sendStatus(400);
        }
        console.log("Persona doc", doc);
        response.json(doc);
    });
});

app.post("/personas/nueva", jsonParser, (request, response) => {
    let newPerson = request.body.persona || {};
    let newPersonClass = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fecchaLiquidacion);
    for(let i = 0;i<newPerson.datosPension.length;i++){
        let ibc = S(newPerson.datosPension[i].IBC).replaceAll("$ ","").replaceAll(".","").replaceAll(",",".").s;
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
});


app.listen(8181,()=> console.log("Listent on 8181 :)"));