const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser)





app.listen(port, () => console.log(`Server is running on http://localhost:${port}`) || 2000);