/**
 * Created by sergiodiazpinilla on 14/12/16.
 */
"use strict";

let express = require("express");
let app = express();

let mongoUtil = require("./mongoUtil");


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

app.listen(8181,()=> console.log("Listent on 8181 :)"));