require("dotenv").config();
const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);

server.listen(port, () => {
    console.log("Server on port:", port);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = { server };