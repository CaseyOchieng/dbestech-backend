const number = Math.round(Math.random() * 100);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const app = express();
const uri = process.env.MONGODB_CONNECTION_STRING
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());





mongoose.connect(uri).then(() => {
    app.listen(port, () => {
        console.log(` Server running at ${number} ms. Happy Coding! `);
        console.info(`Server is running on http://localhost:${port} at ${number} ms`);
    });
}).catch((err) => {
    console.log(err);
});


// mongodb+srv://<username>:<password>@cluster0.nktx1pc.mongodb.net/