const mongoose = require('mongoose');
const URL = 'mongodb+srv://tranhd98:Adogcat2@books.dk0n1.mongodb.net/tranhd98?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || URL;

mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(error => {
        console.log('Connection Error: ${err.message}');
    });

const db = mongoose.connection;

    // Bind the console to errors, to show them on console
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
    
module.exports = db;    
