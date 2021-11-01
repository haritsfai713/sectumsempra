const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const WebSocket = require('ws');

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

// // persiapan websocket
// const wss = new WebSocket.Server({
//     server: server
// });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//         let altint = JSON.parse(message)
//         const alt = {
//             nama: "alt",
//             value: altint["value"]["alt"].toFixed(2)
//         }
//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(alt))
//             }
//         })
//     });

//     setInterval(function() {
//         var gstint = Math.floor(Math.random() * 10) + 1;
//         const gs = {
//             nama: "gs",
//             value: gstint
//         }
//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(gs))
//             }
//         })

//     }, 1000);


// });



const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4200"]
    },
});
// socket.io
io.on('connection', socket => {
    console.log(socket.id)
    socket.on("room", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        if (payloadjson.room === '') {
            io.emit("test-event", "hey this is from room")
            io.emit('test-event', `private message from this ${payloadjson.room}` + ` data ${ payloadjson.data}`)
        } else {
            socket.join(payloadjson.room);
            // setInterval(() => {
            //     var gstint = Math.floor(Math.random() * 100) + 1;
            //     const gs = {
            //         nama: "gs",
            //         value: gstint
            //     }
            //     if (room == "coba") {
            //         io.to(room).emit('test-event', gs)
            //     } else {
            //         io.to(room).emit('test-event', "hey")
            //     }
            // }, 1000)
            io.to(payloadjson.room).emit('test-event', `private message from this ${payloadjson.room}` + ` data ${ payloadjson.data}`)
        }
        console.log(JSON.parse(payload));
    })
    socket.emit('test-event', 'here some data')
})