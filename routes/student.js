var express = require('express');
var passport = require('passport');
const student_controlers = require('../controllers/student');
var router = express.Router();
var Account = require('../models/account');
const secured = (req, res, next) => {
  if (req.user){
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

/* GET home page. */
router.get('/', student_controlers.student_view_all_Page);

router.get('/student/:id', student_controlers.student_detail);

router.get('/detail',student_controlers.student_view_one_Page);

router.get('/create', secured, student_controlers.student_create_Page);

router.get('/update', secured, student_controlers.student_update_Page);

router.get('/delete', secured, student_controlers.student_delete_Page);
  
  
module.exports = router;
