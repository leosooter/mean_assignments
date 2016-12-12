var express = require('express');
var path = require('path');
//var session = require('express-session');
var users = require('./userDatabase');
var chats = require('./chatDatabase');
var app = express();

//app.use(session({secret: 'password123456789', resave: true, saveUninitialized: true}));
app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Url routes
app.get('/', function(req, res){
  res.render('index');
});
//
// app.get('/wall', function(req, res){
//   //req.session.joined = true;
//   res.render('wall');
// });

var server = app.listen(8000);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Connetcted: ", socket.id);

  //User clicks submit_name button- validates name- adds name to users database
  //If name is valid, sends back existing users and chats to be displayed on new member's wall
  socket.on('new_join', function(data){
    console.log(data.name);
    console.log("Add Name id=", socket.id);
    //Basic validation on name
    if(data.name.length > 0 && typeof data.name === 'string'){
      console.log("Name is valid");
      users.addUser(socket.id, data.name);
      socket.broadcast.emit('member_joined', {id : socket.id, name : data.name});
      socket.emit('join_return', {valid : true, chats : chats.getChats(), members : users.getUsers()});
    }
    else{
      socket.emit('join_return', {valid : false});
    }
  });
  
  //User clicks submit_chat button
  socket.on('add_chat', function(data){
    console.log("Chat= ", data);
    if(data.content.length > 0 && typeof data.content === 'string'){
      var author = users.getName(socket.id);
      chats.addChat(author, data.content);
      socket.broadcast.emit('append_chat', {author : author, content : data.content});
      socket.emit('append_chat', {author : author, content : data.content});
    }
    else{
      console.log("Empty or invalid chat");
    }
  });

  socket.on('disconnect', function(){
    console.log("removing user");
    users.deleteUser(socket.id);
    socket.broadcast.emit('remove_member', {id : socket.id});
  });
});
