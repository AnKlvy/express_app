var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexapp = require('./routes/index');
var usersapp = require('./routes/users');
var booksapp = require('./controllers/bookController');

// const { MongoClient } = require("mongodb");
// const cors = require("cors");
// const { ObjectId } = require("mongodb"); // Импортируйте ObjectId из mongodb

const uri = "mongodb://127.0.0.1:27017/";
// const client = new MongoClient(uri);
let students; // Создаем переменную для коллекции студентов

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexapp);
app.use('/users', usersapp);
app.use('/books', booksapp);

// app.use(cors());
// app.use(Express.json()); //для разбора JSON-тела запросов


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     const database = client.db("university");
//     students = database.collection("students");
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//   }
// }

app.listen(8080, () => {
    console.log("http://localhost:8080");
    // connectToMongoDB();
  });