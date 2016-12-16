"use strict"

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;


module.exports = {
    connect(){
        client.connect("mongodb://localhost:27017/pension-dev", (err, db)=>{
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
    }
}