// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan")
const cors = require("cors")


// //import buat socket.io
// const http = require('http')
// const SocketIO = require('socket.io')

// LOCAL IMPORT
// const parameterRouter = require("./router/parameterRouter");
// const waypointRouter = require("./router/waypointRouter");
const userRouter = require("./router/userRouter");
const flightdataRouter = require("./router/flightDataRouter")

// INITIALIZE EXPRESS APP
const app = express();

// // buat socket
// const server = http.server(app);

// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//     console.log(`started on port : ${port}`);
// })

// io.on('connection', (socket))



// GLOBAL MIDDLEWARE
// 1). Body parser, membuat req.body menjadi accessible dari data req
app.use(express.json());
// 2). Morgan Package untuk melihat request yang masuk
app.use(morgan('dev'))
    // 3). CORS
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// API ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/flightdata", flightdataRouter);
// app.use("/api/v1/parameters", parameterRouter);
// app.use("/api/v1/waypoints", waypointRouter);

// SEND FAVICON (Secara default browser akan merequest ke /favicon, agar tidak terjadi error maka dibuat route ini)
app.get("/favicon.ico", (req, res, next) => {
    res.sendStatus(404); //HARUSNYA NGIRIM FILE FAVICON BENERAN,TAPI KALAU 404 NANTI BROWSER MAKE FAVICON DEFAULT
});

// HANDLING UNAVAILABLE ROUTE
app.all("*", (req, res, next) => {
    next(
        new createError(
            400,
            `Tidak bisa menemukan ${req.originalUrl} dari server ini!`
        )
    );
});

// buat deploy angular
// app.listen(process.env.PORT || 8080)

//GLOBAL ERROR HANDLER MIDDLEWARE

module.exports = app;