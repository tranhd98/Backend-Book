
let express = require('express');
const { find, findOne } = require('../models/books');

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
    let author = request.query['author'];
    if (author){
        BookSchema
            .find({"Author": author})
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

router.get('/:ISBN', (request, response, next) => {
    BookSchema
        .findOne({"ISBN": request.params.ISBN}, (error, result) =>{
            if(error){
                response.status(500).send(error);
            }
            if(result){
                response.send(result);
            }
            else{
                response.status(404).send({"ISBN": request.params.ISBN, "error": "not found"});
            }
        })
});

router.patch('/:isbn', (request, response, next) => {
    BookSchema
        .findOne({"ISBN": request.params.isbn},(error, result) =>{
            if(error){
                response.status(500).send(error);
            }
            else if(result){
                if(request.body.ISBN){
                    this.delete.request.body.ISBN;
                }
                for(let field in request.body){
                    result[field] = request.body[field];
                }
                result.save((error, books) =>{
                    if(error){
                        response.status(500).send(error);
                    }
                    else{
                        response.send(books);
                    }
                });
            }
            else{
                response.status(404).send({"ISBN": request.params.isbn, "error": "Not Found"});
            }
        });
});
router.delete('/:isbn', (request, response, next) =>{
    BookSchema
        .findOne({"ISBN": request.params.isbn}, (error,result) =>{
            if(error){
                response.status(500).send(error);
            }
            else if(result){
                result.remove((error)=>{
                    if(error){
                        response.status(500).send(error);
                    }
                    response.send({"deleteISBN": request.params.isbn});
                });
            }
            else{
                response.status(404).send({"ISBN": request.params.isbn, "error": "Not Found"});
            }

        });
});
module.exports = router;