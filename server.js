// Buat Deploy angular
const express = require("express");

function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return reduce.redirect('https://' + req.get('host') + req.url)
    }
    next();
}
const app = express();


app.use(requireHTTPS);

app.use(express.static('./dist/GCSapp21'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {
        root: 'dist/GCSapp21'
    });
})

app.listen(process.env.PORT || 8080)