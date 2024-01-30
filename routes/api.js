/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = 'mongodb://root:admin123@ds249992.mlab.com:49992/fcc-mongo-challenges';
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').find({}).toArray((err, data) => {
          const books = data.map((x) => {
            return { 
              _id: x._id,
              title: x.title,
              commentcount: x.comments.length
            };
          })
          res.json(books);
        })
      })
    })
    
    .post(function (req, res){
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(title){
        const book = {
        title: req.body.title,
        comments: []
      }
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').insertOne(book, (err, data) => {
          res.json({_id: book._id, title: book.title, comments: book.comments});
        })
      });
      } else {
        res.send('title is required');
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').remove({}, (err, data) => {
          if(data.result.ok){
            res.send('complete delete successful');
          } else {
            res.send('could not delete');
          }
        });
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if(ObjectId.isValid(bookid)){
        MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
          db.collection('books').findOne({"_id": ObjectId(bookid)}, (err, data) => {
            if(data !== null) {
              res.json(data);
            } else {
              res.send('_id error');
            }
          })
        })
      } else {
        res.send('_id error');
      }
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      if(ObjectId.isValid(bookid)){
        if(comment){
          MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
            db.collection('books').findAndModify({"_id": ObjectId(bookid)}, 
            {}, 
            {$push: {comments: comment}}, 
            {new: true}, (err, data) => {
              if(data.value) {
                res.json(data.value);
              } else if(err) {
                res.send('error');
              }
            })
          })
        } else {
          res.send('comment field is empty');
        }
      } else {
        res.send('_id error');
      }
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      if(ObjectId.isValid(bookid)){
        MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
          db.collection('books').remove({"_id": ObjectId(bookid)}, (err, data) => {
            if(data.result.ok){
              res.send('delete successful');
            } else if(err){
              res.send('could not delete');
            }
          })
        })
      } else {
        res.send('_id error');
      }
    });
  
};
