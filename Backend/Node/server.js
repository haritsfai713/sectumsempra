// package import 
const express = require('express');
const bodyParser = require('body-parser');

// local import 
const {
    mongoose
} = require('././db');
var parameterRouter = require('./router/parameterRouter');
var waypointRouter = require('./router/waypointRouter');
var app = express();

app.use(bodyParser.json());
app.listen(3000, () => console.log('server started at port : 3000'));

app.use('/parameters', parameterRouter);
app.use('/waypoints', waypointRouter);

let distDir = __dirname + "/";
app.use(express.static(distDir));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('invaild endpoint');
});
let server = app.listen(port, function() {
    let ports = server.address().port;
    console.log("App now running on port", ports);
});