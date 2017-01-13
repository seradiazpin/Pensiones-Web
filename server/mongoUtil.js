/**
 * Created by sergiodiazpinilla on 13/01/17.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://sergioAdmin:pecasPensiones@ds151048.mlab.com:51048/pensiones-chimps');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Conected Mongo");
});