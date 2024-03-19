const number = Math.round(Math.random() * 100);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());




app.listen(port, () => {
    console.log(`Running on Port ${port} at ${number} ms. Happy Testing`)
    console.info(`Server is running on http://localhost:${port} at ${number} ms`);
});