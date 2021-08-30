const dotenv = require("dotenv");
const mongoose = require("mongoose");
const WebSocket = require('ws');

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

// persiapan websocket
const wss = new WebSocket.Server({
    server: server
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    setInterval(function() {
        var altint = Math.floor(Math.random() * 10) + 1;
        const alt = {
            nama: "alt",
            value: altint
        }
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(alt))
            }
        })
        var gstint = Math.floor(Math.random() * 10) + 1;
        const gs = {
            nama: "gs",
            value: gstint
        }
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(gs))
            }
        })

    }, 1000);


});