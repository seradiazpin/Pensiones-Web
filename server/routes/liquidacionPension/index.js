/**
 * Created by sergiodiazpinilla on 11/01/17.
 */
const person = require('express').Router();
const lqPension = require('../../controllers/LiquidacionCtrl');

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

person.get('/', lqPension.getPersons);
person.get('/:documento', lqPension.getPerson);
person.post('/nueva',jsonParser,lqPension.addPerson);
person.post('/editar/:documento',jsonParser,lqPension.editPerson);
module.exports = person;