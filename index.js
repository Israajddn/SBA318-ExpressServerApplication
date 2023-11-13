const express = require("express");
const app = express();
const port = 3000;

const error = require("./utilities/error");

// Importing the data from database files.
const users = require("./data/users");
const posts = require("./data/posts");
const comments = require("./data/comments");

// Custom logging requests middleware.
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};

app.use(logReq);

// Creating a GET route for the entire users database.
app.get("/api/users", (req, res) => {
    res.json(users);
});

// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
});

// Creating a GET route for the entire posts database.
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

// Creating a simple GET route for individual posts,
// using a route parameter for the unique id.
app.get("/api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
});

// Creating a GET route for the entire comments database.
app.get("/api/comments", (req, res) => {
    res.json(comments);
});

// Creating a simple GET route for individual comments,
// using a route parameter for the unique id.
app.get("/api/comments/:id", (req, res) => {
    const comment = comments.find((c) => c.id == req.params.id);
    if (comment) res.json(comment);
});

app.get("/", (req, res) => {
    res.send("Home Page");
});

// Custom 404 (not found) middleware.
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});

// Error-handling middleware.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});