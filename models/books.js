const mongoose = require('mongoose')


let Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
let BookSchema = new Schema({
    Name: String,
    Author: String,
    ISBN: {
        type: String,
        validate: {
            validator: function(v) {
              return /\d{13}/.test(v);
            },
            message: props => `${props.value} is not a valid ISBN!`
          },
          required: [true, 'ISBN required']
    },
    Price: mongoose.Decimal128
});


module.exports = mongoose.model('Book', BookSchema);
