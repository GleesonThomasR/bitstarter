var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send("");
});

var fs = require('fs');
console.log("ok");
var content = fs.readFileSync('./bitstarter/index.html');
console.log("Contents: " + content);


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});