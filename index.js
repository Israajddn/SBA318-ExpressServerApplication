const express = require("express");
const app = express();
const port = 3000;

const error = require("./utilities/error");

// Importing the data from database files.
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

// Custom logging requests middleware.
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};

app.use(logReq);

// Use our Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes)



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