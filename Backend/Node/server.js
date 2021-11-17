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


var listroom = []
var uniqueListRoom = []
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4200"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});
// socket.io
io.on('connection', socket => {
    console.log(socket.id)
    socket.on("room", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)

        // console.log(payloadjson)
        const mavData = payloadjson.data.fields
        const data = {
            message: payloadjson.data.message,
            mavData
        }
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
            io.to(payloadjson.room).emit('test-event', JSON.stringify(data))
        }
        // console.log(data);
    })
    socket.emit('test-event', 'here some data')
    socket.on("arm_disarm", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        io.to(payloadjson.room).emit('arm_disarm', payloadjson.data)
        console.log(payloadjson)
    })
    socket.on("leave-room", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        socket.leave(payloadjson.room)
    })
    socket.on("mission", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        io.to(payloadjson.room).emit('mission', payloadjson.data)
        console.log(payloadjson)
    })
    socket.on("read-mission", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        io.to(payloadjson.room).emit('read-mission', payloadjson.data)
        console.log(payloadjson)
    })
    socket.on("req-parameter", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        socket.join(payloadjson.room);
        io.to(payloadjson.room).emit('req-parameter', payloadjson.data)
        console.log(payloadjson)
    })
    socket.on("get-parameter", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        socket.join(payloadjson.room);
        io.to(payloadjson.room).emit('get-parameter', JSON.stringify(payloadjson.data))
        console.log(payloadjson)
    })
    socket.on("set-parameter", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        socket.join(payloadjson.room);
        io.to(payloadjson.room).emit('set-parameter', (payloadjson.data))
        console.log(payloadjson)
    })
    socket.on("list-room", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        if (!(payloadjson.room in listroom)) {
            listroom.push(payloadjson.room)
        }
        uniqueListRoom = listroom.filter((x, i, a) => a.indexOf(x) == i)
        console.log(uniqueListRoom)
        io.emit('list-room', uniqueListRoom)
    })
    socket.on("dellist-room", payload => {
        socket.room = payload.room
        const payloadjson = JSON.parse(payload)
        index = 0
        for (i = 0; uniqueListRoom.length; i++) {
            if (uniqueListRoom[i] == payloadjson.room) {
                index = i
                break;
            }
        }

        listroom = listroom.filter(removeRoom);

        function removeRoom(age) {
            return age != payloadjson.room;
        }
        uniqueListRoom.splice(index, 1);
        console.log(uniqueListRoom)
        io.emit('list-room', uniqueListRoom)
    })
})
