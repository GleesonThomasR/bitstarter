var fs = require("fs");
console.log("readingfile");
var contents = fs.readFileSync(".bitstarter/index.html");
console.log("Contents: " + contents);

var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send("2");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
