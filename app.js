const number = Math.round(Math.random() * 100);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require('dotenv').config();
const express = require("express");
const app = express();


app.use(bodyParser)





app.listen(port, () => {
    console.log(`Running on Port ${port} at ${number} ms. Happy Testing`)
    console.info(`Server is running on http://localhost:${port} at ${number} ms`);
});