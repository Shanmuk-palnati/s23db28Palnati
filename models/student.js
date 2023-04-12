const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    Name: String,
    SId: Number,
    Email: String
})

module.exports = mongoose.model("student",studentSchema)