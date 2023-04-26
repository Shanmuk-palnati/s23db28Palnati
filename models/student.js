const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    Name: String,
    SId: {type: Number, min: 0, max: 100},
    Email: {type: String, required:true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']}
})

module.exports = mongoose.model("student",studentSchema)