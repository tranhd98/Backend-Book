const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

let Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
let BookSchema = new Schema({
    Name: String,
    Author: String,
    ISBN: {
        type: String,
        min: 13,
        max: 13
    },
    Price: SchemaTypes.Double
});
