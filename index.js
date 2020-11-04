const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require("./routes/user");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/rb8`);

//Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});