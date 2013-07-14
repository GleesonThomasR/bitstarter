var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send("");
});

var fs = require('fs');
console.log("");
fs.readFile("./bitstarter/index.html"), function(error, data) {
    console.log("" + data);});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});