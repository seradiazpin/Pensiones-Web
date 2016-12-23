/**
 * Created by sergiodiazpinilla on 14/12/16.
 */
"use strict";

let express = require("express");
let app = express();

let mongoUtil = require("./mongoUtil");


//mongoUtil.connect();
app.use(express.static(__dirname + "/../client"));

/*
app.get("/sports", (request, response)=>{
    let sports = mongoUtil.sports();
    sports.find().toArray((err,doc) =>{
    let sportsNames = doc.map((sport)=>sport.name);
    response.json(sportsNames);
    });
});*/

app.get("/personas",(req,res)=>{
    /*
    let personas = mongoUtil.personas();
    personas.find().toArray((err,doc)=>{
        let nombresPersonas = doc.map((persona)=>persona.nombre);
        response.json(nombresPersonas);
    });*/
    res.json(["Juan","Maria","LOL"]);
});


app.listen(8181,()=> console.log("Listent on 8181 :)"));