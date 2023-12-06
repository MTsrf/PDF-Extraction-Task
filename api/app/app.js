const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/db')
const path = require('path')

const app = express()
dotenv.config()
app.use(express.json(), cors())
app.use("/files", express.static(path.join(__dirname, "../public/files/")));
const routerPath = path.join(__dirname, 'routes');
const files = readdirSync(routerPath);
files.map((file) => {
    const filePath = path.join(routerPath, file);
    app.use('/api', require(filePath));
});

app.get("/", (req, res) => {
    res.json("Server is working");
});

app.use(errorHandler)

connectDb()

module.exports = app;

