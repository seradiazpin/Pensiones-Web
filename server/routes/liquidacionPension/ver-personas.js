/**
 * Created by sergiodiazpinilla on 11/01/17.
 */
let mongoUtil = require("../../mongoUtil");

module.exports = (request, response) => {
    let personas = mongoUtil.personas();
    personas.find().toArray((err,doc)=>{
        let nombresPersonas = doc.map((persona)=>[persona.nombre,persona.documento]);
        response.json(nombresPersonas);
    });
};
