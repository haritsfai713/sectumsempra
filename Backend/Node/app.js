// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");

// LOCAL IMPORT
// const parameterRouter = require("./router/parameterRouter");
// const waypointRouter = require("./router/waypointRouter");
const userRouter = require("./router/userRouter");

// INITIALIZE EXPRESS APP
const app = express();

// GLOBAL MIDDLEWARE
// 1). Body parser, membuat req.body menjadi accessible dari data req
app.use(express.json());
// 2).

// API ROUTES
app.use("/api/v1/users", userRouter);
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

//GLOBAL ERROR HANDLER MIDDLEWARE

module.exports = app;
