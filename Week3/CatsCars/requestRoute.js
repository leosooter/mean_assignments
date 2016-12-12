var fs = require('fs');
module.exports = function(request, response){
  var route = request.url;
  var viewRoutes = {
    '/' : 'views/cats.html',
    '/cats' : 'views/cats.html',
    '/cars' : 'views/cars.html',
  }
  if(route in viewRoutes){
    console.log('Route is: ', viewRoutes[route]);
    readUTF(viewRoutes[route], 'html');
  }
  else{
    route = route.substr(1);
    var routeArray = route.split(/[/.]+/)
    console.log(routeArray);
    switch (routeArray[0]){
      case 'images':
        console.log("File is image");
        readImage(route, routeArray[routeArray.length - 1])
        break;
      case 'stylesheets':
        console.log("File is css");
        readUTF(route, routeArray[routeArray.length - 1])
        break;
      default:
        response.end('File not found');
    }
  }
  function readUTF(path, type){
    fs.readFile(path, 'utf8', function(errors, contents){
      response.writeHead(200, {'Content-type' : `text/${type}`});
      response.write(contents);
      response.end();
    });
  }

  function readImage(path, type){
    fs.readFile(path, function(errors, contents){
      response.writeHead(200, {'Content-type' : `image/${type}`});
      response.write(contents);
      response.end();
    });
  }
}
