var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send("2");
});


var fs = require('fs');
console.log("hey");
var content = fs.readFileSync('https://github.com/GleesonThomasR/bitstarter/index.html');
console.log("you" + content);



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});