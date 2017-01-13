"use strict";

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;


module.exports = {
    connect(){
        client.connect("mongodb://sergioAdmin:pecasPensiones@ds151048.mlab.com:51048/pensiones-chimps", (err, db)=>{
            if(err){
                console.log("Error connecting to mongo - checlk connection");
                process.exit();
            }
            _db = db;
            console.log("Connected to Mongo");
        });
    },
    personas(){
            return _db.collection("personas");
    },
    guardarPersona(doc){
        this.personas().insert(doc,function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
        });
    },
    usuarios(){
         return _db.collection("usuarios");
    },
    guardarUsuario(doc){
        this.usuarios().insert(doc,function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
        });
    }
};