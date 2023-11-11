var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;


  
  router.get("/", (req, res) => {
      const data = {
        title: 'Пример страницы с jade',
        message: 'Привет, мир! Это пример использования jade в Express.',
    };
  
    // Отображение страницы index.ejs и передача данных
      res.render('index', { data:data });
      // res.send("Hello, World!");
  
  });
  
  
  // Read collection
  router.get("/api/university/getStudents", async (request, response) => {
    try {
      const result = await students.find({}).toArray();
      response.send(result);
    } catch (error) {
      console.error("Error fetching students:", error);
      response.status(500).send("Internal Server Error");
    }
  });
  
  // Add a new document to the collection
  router.post("/api/university/addStudent", async (req, res) => {
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
  router.get("/api/university/getStudent/:_id", async (req, res) => {
    let query = { _id: new ObjectId(req.params._id) };
    let result = await students.findOne(query);
    if (!result) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json(result);
    }
  });
  
  router.put("/api/university/updateStudent/:_id", async (req, res) => {
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
  router.delete("/api/university/deleteStudent/:_id", async (req, res) => {
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