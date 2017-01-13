/**
 * Created by sergiodiazpinilla on 12/01/17.
 */
const mongoose = require('mongoose');
// grab the things we need
const Schema = mongoose.Schema;

// create a schema
let person = new Schema({
    nombre : String,
    documento : { type: String, required: true, unique: true },
    genero : String,
    fechaNacimiento : String,
    regimen : { type: String, default:"NODEFINIDO"},
    correo : { type: String, default:"Sin correo electrinico"},
    anotaciones : { type: String, default:"Este usuario no tiene anotaciones ni informacion adicional"},
    tipoCotizacion : { type: String, default:"1"},
    fechaLiquidacion : String,
    datosDecision : {
        edad1994 : Number,
        totalSemanasCotizadas : { type: Number, default:0},
        semanas1994 : { type: Number, default:0},
        semanas2005 : { type: Number, default:0}
    },
    datosLiquidacion : {
        pIBLtv : { type: Number, default:0},
        pIBL10A : { type: Number, default:0},
        pIBLuA : { type: Number, default:0},
        monto : { type: Number, default:0},
        montoLey : { type: Number, default:0},
        nSalariosMin : { type: Number, default:0},
        valorPensionDecreto : { type: Number, default:0},
        valorPensionLey : { type: Number, default:0},
        valorPensionPublicos : { type: Number, default:0},
        valorPensionAportes : { type: Number, default:0},
        fechaCumplimiento : { type: String, default:"10/10/10"}
    },
    datosPension : []
});

// the schema is useless so far
// we need to create a model using it
let Persona = mongoose.model('Persona', person, 'personas');

// make this available to our users in our Node applications
module.exports = Persona;
