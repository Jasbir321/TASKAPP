const mongoose = require("mongoose");


const todoTable = mongoose.Schema({
    text: {type:String, required:true}
   // datetime: {type:Date, required:false}
});


const todoModel=mongoose.model("todos", todoTable);

module.exports = todoModel;

