const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

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
    Price: SchemaTypes.Double
});


module.exports = mongoose.model('Book', BookSchema);
