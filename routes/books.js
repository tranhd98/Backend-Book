
let express = require('express');

let router = express.Router();

let BookSchema = require('../models/books');

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.post('/', (request,response, next) => {
    let newBook = request.body;
    if(!newBook.ISBN || !newBook.Author || !newBook.Name || !newBook.Price){
        HandleError(response, 'Missing Info', 'From data missing', 500);
    }
    else{
        let book = new BookSchema({
            Name: newBook.Name,
            Author: newBook.Author,
            ISBN: newBook.ISBN,
            Price: newBook.Price
        });
        book.save((error) => {
            if(error){
                response.send({"error": error});
            }
            else{
                response.send({"id": book.id});
            }
        });
    }
});

router.get('/', (request, response, next) => {
    let name = request.query['name'];
    if (name){
        BookSchema
            .find({"Name": name})
            .exec( (error, books) => {
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(books);
                }
            });
    }else{
        BookSchema
            .find()
            .exec( (error, books) => {
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(books);
                }
            });
        }
});
module.exports = router;