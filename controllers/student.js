var Student = require('../models/student');
// List of all Students
// List of all Costumes
exports.student_list = async function(req, res) {
    try{
        theStudents = await Student.find();
        res.send(theStudents);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
    
// for a specific Student.
exports.student_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: Student detail: ' + req.params.id);
};

// Handle Costume create on POST.
exports.student_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Student();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"costume_type":"goat", "cost":12, "size":"large"}
    document.Name = req.body.name;
    document.SId = req.body.sid;
    document.Email = req.body.email;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Student delete form on DELETE.
exports.student_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: Student delete DELETE ' + req.params.id);
};
// Handle Student update form on PUT.
exports.student_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: Student update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.student_view_all_Page = async function(req, res) {
    try{
        theStudents = await Student.find();
        res.render('student', { title: 'Student Search Results', students: theStudents });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};