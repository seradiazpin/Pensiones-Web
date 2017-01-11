/**
 * Created by sergiodiazpinilla on 11/01/17.
 */
let mongoUtil = require("../../mongoUtil");

module.exports = (request, response) => {
    let id = request.params.documento;
    //console.log("buscando: "+id);
    if(id == null || isNaN(Number(id))){
        response.sendStatus(404);
    }else{
        //console.log("Persona - lol ",id);
        let persona = mongoUtil.personas();
        persona.find({documento:id}).limit(1).next((err,doc) =>{
            if(err){
                response.sendStatus(400);
            }
            //console.log("Persona doc", doc);
            response.json(doc);
        });
    }
};
