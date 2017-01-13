/**
 * Created by sergiodiazpinilla on 12/01/17.
 */
const passport = require('passport');
const expressSession = require('express-session');
const security = require('express').Router();
const bCrypt = require('bcrypt-nodejs');
/*
security.use(expressSession({secret: 'mySecretKey'}));
security.use(passport.initialize());
security.use(passport.session());

// Generates hash using bCrypt
let createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

let savePassword = (usuario,password)=>{
    mongoUtil.guardarUsuario({"usuario":usuario,"password":createHash(password)});
};

let isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    mongoUtil.usuarios().find({'_id':id}).limit(1).next((err,user) =>{
        //console.log("Persona doc", doc);
        done(err, user);
    });
});

*/