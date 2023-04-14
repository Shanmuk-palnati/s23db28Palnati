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
exports.student_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Student.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
exports.student_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Student.findById( req.params.id)
    // Do updates of properties
        if(req.body.name) toUpdate.Name = req.body.name;
        if(req.body.sid) toUpdate.SId = req.body.sid;
        if(req.body.email) toUpdate.Email = req.body.email;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
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