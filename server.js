const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const User = require("./userModel.js");
const app = express();
const path = require('path')
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workoutdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });


//view
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
