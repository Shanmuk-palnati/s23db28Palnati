var express = require('express');
const student_controlers = require('../controllers/student');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('student', { title: 'Search Results shanmuk' });
});*/

router.get('/', student_controlers.student_view_all_Page);

router.get('/student/:id', student_controlers.student_detail);

module.exports = router;
