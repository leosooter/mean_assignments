var http = require('http');
var requestRoute = require('./requestRoute');
var server = http.createServer(function(request, response){
  requestRoute(request, response);
});

server.listen(8000);
