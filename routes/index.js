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