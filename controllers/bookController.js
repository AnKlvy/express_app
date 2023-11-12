var express = require('express');
var router = express.Router();
var Book = require('../models/book');

module.exports = router;
// Создание книги
router.post('/', async (req, res) => {
    try {
      const { title, author, year } = req.body;
      const newBook = new Book({ title, author, year });
      const savedBook = await newBook.save();
      res.json(savedBook);
    } catch (error) {
      res.status(500).send('Ошибка при создании книги');
    }
  });
  
  // Получение всех книг
  router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).send('Ошибка при получении книг');
    }
  });
  
  // Получение книги по ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).send('Книга не найдена');
      }
    } catch (error) {
      res.status(500).send('Ошибка при получении книги');
    }
  });
  
  // Обновление книги по ID
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).send('Книга не найдена');
      }
    } catch (error) {
      res.status(500).send('Ошибка при редактировании книги');
    }
  });
  
  // Удаление книги по ID
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findOneAndDelete(id);
      if (deletedBook) {
        res.send('Книга успешно удалена');
      } else {
        res.status(404).send('Книга не найдена');
      }
    } catch (error) {
      res.status(500).send('Ошибка при удалении книги');
    }
  });

