/**
 * Created by sergiodiazpinilla on 14/12/16.
 */
"use strict";

const express = require("express");
const app = express();
const routes = require('./routes');
const conect = require("./mongoUtil");

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));

//  Connect all our routes to our application
app.use('/', routes);


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
