# Soul db store Backend

## Description

Db store is a beginner-friendly backend application created by Casey Ochieng. It's designed to serve as an accessible foundation for building web applications, offering essential functionality for handling requests and interacting with a database.
The codebase is well-documented and includes clear explanations, making it ideal for beginners to explore, experiment with, and practice their backend development skills. Whether you're new to backend development or looking to strengthen your understanding, db store provides an excellent starting point.

Feel free to fork the project, explore the code, and experiment with different features. Happy coding!

## Installation

To install dbestech backend, follow these steps:

1. Clone the repository from [GitHub](https://github.com/CaseyOchieng/dbestech-backend.git):

```bash
git clone git@github.com:CaseyOchieng/dbestech-backend.git
```

2. Navigate to the project directory:

```bash
cd dbestech-backend
```

3. Install dependencies using npm:

```bash
npm install or npm i
```

## Usage

To start the backend server, run the following command:

```bash
npm start
```

This will launch the server using nodemon, enabling automatic server restarts upon file changes.

## Dependencies

The backend relies on the following dependencies:

- **Express**: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is used here to handle routing, middleware, and request/response handling.

- **Mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks. It's utilized here to interact with the MongoDB database.

- **Nodemon**: Nodemon is a utility that monitors for changes in files in a Node.js application and automatically restarts the server. It's used in development to streamline the development process by eliminating the need to manually restart the server after every code change.

## Server Setup

```javascript
This code snippet does the following:
const number = Math.round(Math.random() * 100);
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
const authRouter = require("./routes/auth");

app.use("/", authRouter);

mongoose
  .connect(
    "mongodb+srv://<user>:<password>@cluster0.nktx1pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(
      `Database connected and Running at ${number} ms. Happy Coding ✨! `
    );
    app.listen(port, () => {
      console.log("-------------------------🔥---------------------------");
      console.info(
        `Server is running on http://localhost:${port} at ${number} ms`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

- Generates a random number between 0 and 100 and assigns it to the variable number.
- Imports necessary libraries and sets up the server configuration:
  - bodyParser for parsing incoming request bodies.
  - Sets the port for the server to either use the environment variable PORT or default to 4000.
  - mongoose for MongoDB object modeling.
  - express for building the web server.
  - morgan for HTTP request logging.
  - cors for enabling Cross-Origin Resource Sharing.
  - dotenv for loading environment variables from a .env file.
- Creates an instance of the Express application.
- Configures the Express app to use the imported middleware:
  - bodyParser for parsing JSON data.
  - morgan for logging HTTP requests.
  - cors for handling Cross-Origin Resource Sharing.
- Imports the authentication router from './routes/auth'.
- Connects to a MongoDB database using the mongoose.connect method.
- If the database connection is successful, it starts the Express server to listen on the specified port.
- Logs a success message with the database connection details and the server URL.

```

## Authentication Routes

```javascript
// This code snippet defines the routes related to authentication, such as registration, login, password reset, etc.
// Defines routes for registering a new user, logging in, resetting passwords, and verifying OTP.
// These routes handle user authentication and provide endpoints for user-related functionalities.
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("auth");
});

router.post("/login", (req, res) => {
  res.send("auth");
});

router.post("/forgot-password", (req, res) => {
  res.send("auth");
});

router.post("/verify-otp", (req, res) => {
  res.send("auth");
});

router.post("/reset-password", (req, res) => {
  res.send("auth");
});

module.exports = router;
```

## Issues

If you encounter any issues with dbestech backend, please report them on the [GitHub issues page](https://github.com/CaseyOchieng/dbestech-backend/issues).

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

For more information, visit the [project homepage](https://github.com/CaseyOchieng/dbestech-backend#readme).
