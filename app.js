/*This code snippet does the following:
Generates a random number between 0 and 100 and assigns it to the variable number.
Imports necessary libraries and sets up the server configuration:
body-parser for parsing incoming request bodies.
Sets the port for the server to either use the environment variable PORT or default to 4000.
mongoose for MongoDB object modeling.
express for building the web server.
morgan for HTTP request logging.
cors for enabling Cross-Origin Resource Sharing.
dotenv for loading environment variables from a .env file.
Creates an instance of the Express application.
Configures the Express app to use the imported middleware:
bodyParser for parsing JSON data.
morgan for logging HTTP requests.
cors for handling Cross-Origin Resource Sharing.
Imports the authentication router from './routes/auth'.
Connects to a MongoDB database using the mongoose.connect method.
If the database connection is successful, it starts the Express server to listen on the specified port.
Logs a success message with the database connection details and the server URL.
*/




const number = Math.round(Math.random() * 100);
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
const authRouter = require('./routes/auth');


app.use('/auth', authRouter)

mongoose
    .connect("")
    .then(() => {
        console.log(`Database connected and Running at ${number} ms. Happy Coding ✨! `);
        app.listen(port, () => {
            console.log("-------------------------🔥---------------------------");
            console.info(`Server is running on http://localhost:${port} at ${number} ms`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

