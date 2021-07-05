
// require the library
const mongoose = require('mongoose');
// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire connection (to check if its successfull)
const db = mongoose.connection;


// error
db.on('error',console.error.bind(console,'Error connecting db'));
// up and running
db.once('open',function(){
    console.log("Successfully Connected to dataBase")
    });