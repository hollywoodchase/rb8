const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user')
const mongoose = require("mongoose");
const path = require('path');

// Connect to Mongo DB
mongoose.connect(
	process.env.MONGODB_URI ||
	"mongodb+srv://hollywoodchase:Gnocchi420*@cluster0.w1gtu.mongodb.net/rb8?retryWrites=true&w=majority"
  );


// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "build")));
}

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const user = require('./routes/user')

// const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/rb8`);

// //Define middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // Add routes, both API and view
// app.use('/user', user)


// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`app running on port ${PORT}`)
// });