const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process?.env?.port || 8080;

app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

// Use micro routes

// Services
const taskManagerService = require("./services/taskManagerService");

// Start the server
app.listen(port, () => {
    console.log(`Task manager server running on port ${port}`);
});

// Test endpoint
app.get("/testEndpoint", (req, res) => {
    res.send("Task manager test endpoint");
});

app.get("/getTasks", async (req, res) => {
    try {
        const response = await taskManagerService.getTasks();
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/createTask", async (req, res) => {
    try {
        const response = await taskManagerService.createTask(req.body);
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put("/updateTask/:id", async (req, res) => {
    try {
        const response = await taskManagerService.updateTask(req.body, req.params);
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/deleteTask/:id", async (req, res) => {
    try {
        const response = await taskManagerService.deleteTask(req.params);
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});
