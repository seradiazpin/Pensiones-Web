/**
 * Created by sergiodiazpinilla on 14/12/16.
 */
"use strict";

let express = require("express");
let app = express();
let moment = require('moment');
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mongoUtil = require("./mongoUtil");

let S = require('string');
let Persona = require("./dataClass").Persona;
let Informacion = require("./dataClass").Informacion;
let LiquidadorPension = require("./dataClass").LiquidadorPension;


mongoUtil.connect();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/../client"));

app.get("/personas",(request,response)=>{
    let personas = mongoUtil.personas();
    personas.find().toArray((err,doc)=>{
        let nombresPersonas = doc.map((persona)=>[persona.nombre,persona.documento]);
        response.json(nombresPersonas);

    });
});

app.post("/login",jsonParser,(request,response) =>{
    let admin = request.body.admin || {};
    if(admin == {} || !admin){
        response.json({error:true});
    }else{
        if(admin.username === "fediaz" && admin.password === "secret123" ) {
            response.json({error: false});
        }else{
            response.json({error: true});
        }

    }
});

app.get("/:documento", (request,response)=>{
    let id = request.params.documento;

    //console.log("Persona - lol ",id);
    let persona = mongoUtil.personas();
    persona.find({documento:id}).limit(1).next((err,doc) =>{
        if(err){
            response.sendStatus(400);
        }
        //console.log("Persona doc", doc);
        response.json(doc);
    });
});

app.post("/editar/:documento", jsonParser, (request, response) => {
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
});

app.post("/personas/nueva", jsonParser, (request, response) => {
    let newPerson = request.body.persona || {};
    let newPersonClass = new Persona(newPerson.nombre, newPerson.documento, newPerson.genero,newPerson.fechaNacimiento,null,newPerson.correo,newPerson.anotaciones,newPerson.tipoCotizacion,newPerson.fechaLiquidacion);
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
