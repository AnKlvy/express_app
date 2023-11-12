var express = require('express');
const mongoose = require('mongoose');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


mongoose.connect('mongodb://127.0.0.1:27017/express')
  .then(() => console.log('Соединение с MongoDB установлено'))
  .catch(err => console.error('Ошибка соединения с MongoDB:', err));




  
  // Схема и модель для коллекции книг
  const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: String
  });
  
  const Book = mongoose.model('Book', BookSchema);

  module.exports = Book;

  