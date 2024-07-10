// Basic Express JS Server Setup
// [SECTION] Dependecies and Modules
// use the "require" directive to load the express module/package that will allows us to easily create a server
const express = require('express');
// use the "require" directive to load the mongoose module/package that allows us to create Schemas to model our data structure and manipulate our database
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

// [SECTION] Server Setup
// creates an "app" variable that stores the express function/server
const app = express();

// [SECTION] Environment Setup
// assigning a port number for the server to listen to
const port = 4000;

// [SECTION] Middlewares
// allows us to handle incoming data from requests
// allows our app to read json data and convert it to a JS Object
app.use(express.json());
// allows us to receive data/information in other data types aside from strings or arrays.
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// [SECTION] Database connection
// connects our applicaion to our database
mongoose.connect('mongodb+srv://admin:admin1234@kentdb.4oxbo78.mongodb.net/Fitness-Tracker?retryWrites=true&w=majority&appName=kentDB');

// the "db" variable will store the connection status of our mongodb atlas
let db = mongoose.connection;

// failed connection
db.on('error', console.error.bind(console, 'connection error'));
// successful connection
db.once('open', () => console.log(`We're now connected to MongoDb Atlas`));

// [SECTION] Backend Routes
// group all routes inside the user routes under the '/users' endpoint
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// [SECTION] Server Gateway Response
if(require.main === module) {
	app.listen(process.env.PORT || port, () => console.log(`API is now online on port ${process.env.PORT || port}`))
}

module.exports = {app, mongoose}