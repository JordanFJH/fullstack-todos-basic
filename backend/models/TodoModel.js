const mongoose = require("mongoose");

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: { type: String },
    completed: { type: Boolean, default: false }
})

const Todo = mongoose.model("todos", todoSchema)

module.exports = Todo;