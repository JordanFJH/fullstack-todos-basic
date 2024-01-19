const express = require("express")
const cors = require("cors");
require("dotenv").config();
const mongoConfig = require("./config")
const Todo = require("./models/TodoModel")

const app = express();

const PORT = 8080;

// MIDDLEWARE
app.use(cors())
app.use(express.json())


app.get("/api/test", (req, res) => {
    console.log("home page reached")
    res.json("Server says: Hello Client!")
})

// Index Route
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        console.log(error)
        res.send("Uh Oh")
    }
})

// Create Route
app.post("/api/todos", async (req, res) => {
    try {
        console.log("POST request of server")
        console.log(req.body)
        const todo = await Todo.create(req.body)
        res.json(todo)
    } catch (error) {
        console.log(error)
        res.send("Something messed up")
    }
})

// Delete Route
app.delete("/api/todos/:id", async (req, res) => {
    try {
        console.log("The Delete Route")
        await Todo.findByIdAndDelete(req.params.id)
        res.json({ message: "Delete successful" })
    } catch (error) {
        console.log(error)
        res.send("Uh Oh")
    }
})

// Updated Route
app.put("/api/todos/:id", async (req, res) => {
    console.log("In the update route")
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "Updated right"})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log("Listening on port:" + PORT)
    mongoConfig()
})