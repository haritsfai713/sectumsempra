const dotenv = require("dotenv");
const mongoose = require("mongoose");

//ENVIRONMENT CONFIGURATION
dotenv.config({
    path: "./config/.env"
});

//BACKEND APP
const app = require("./app");

//CONNECTING TO DB
const DB = process.env.DATABASE.replace(
    "<DATABASE_PASSWORD>",
    process.env.DATABASE_PASSWORD
);
mongoose.connect(
    DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log("MongoDB connection succeeded.");
        } else {
            console.log("Error in DB connection" + JSON.stringify(err, undefined, 2));
        }
    }
);

//LISTENING TO PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    let ports = server.address().port;
    console.log("App now running on port", ports);
});