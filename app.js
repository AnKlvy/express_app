var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { MongoClient } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require("mongodb"); // Импортируйте ObjectId из mongodb

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors());
app.use(Express.json()); //для разбора JSON-тела запросов


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


async function connectToMongoDB() {
  try {
    await client.connect();
    const database = client.db("university");
    students = database.collection("students");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

app.listen(8080, () => {
//   console.log("Server is running on port 5039");
  connectToMongoDB();
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
  });


// Read collection
app.get("/api/university/getStudents", async (request, response) => {
  try {
    const result = await students.find({}).toArray();
    response.send(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Add a new document to the collection
app.post("/api/university/addStudent", async (req, res) => {
    // try{
    // let newDocument = req.body;
    // console.log(newDocument)
    const result = await students.insertOne(req.body);
    res.send(result);
    // }
    // catch(error){
    //     console.error("Error fetching students:", error);
    // }
});


// Get a single post
app.get("/api/university/getStudent/:_id", async (req, res) => {
  let query = { _id: new ObjectId(req.params._id) };
  let result = await students.findOne(query);
  if (!result) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.status(200).json(result);
  }
});

app.put("/api/university/updateStudent/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  console.log(req.params._id)
  const updates = {
    $set: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password }
  };
  console.log(req.body)
  try{
    let result = await students.updateOne(query, updates);
    console.log(result)
    res.send(result).status(200);
  }
  catch(e){
    console.log(e)
  }

});

// Удаление студента по идентификатору
app.delete("/api/university/deleteStudent/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  try {
    let result = await students.deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).send({});
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Internal Server Error");
  }
});