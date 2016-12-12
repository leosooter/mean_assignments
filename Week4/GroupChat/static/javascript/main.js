$(document).ready(function() {
  console.log('Main.js has loaded');
  var socket = io.connect();
  //Clear error messages on refresh
  $('#error').text("");
  $('#chat_wrapper').hide();

  $('#submit_name').click(function(){
    console.log("Clicked submit_name");
    socket.emit('new_join', {name : $('#new_name').val()});
  });
  //Return is either true or false depending on whether the name is valid
  socket.on('join_return', function(data){
    if(data.valid){
      $('new_name').val("");
      console.log("Name accepted");
      $('#enter_info').hide();
      $('#chat_wrapper').show();
      //Add existing members
      var members = data.members;
      for(key in members){
        $('#members').append(`<p id="${key}" class="member">${members[key]}</p>`);
      }
      //Add existing chats
      var chats = data.chats;
      for (var i = 0; i < chats.length; i++) {
        console.log(chats[i]);
        var newChat = `<p class="chat"><span class="author">${chats[i].author}: </span> <span class="content">${chats[i].content}</span></p>`
        $('#chat_wall').append(newChat);
      }
    }
    else{
      $('#error').text("Please enter a valid name");
    }
  });

  socket.on('member_joined', function(data){
    $('#members').append(`<p id="${data.id}" class="member">${data.name}</p>`);
  })

  socket.on('remove_member', function(data){
    $(`#${data.id}`).remove();
  })

  socket.on('all_chats', function(data){
    console.log("Got chats");

  })

  $('#submit_chat').click(function(){
    socket.emit('add_chat', {content : $('#new_chat').val()});
    $('#new_chat').val("");
  });

  socket.on('append_chat', function(data){
    var newChat = `<p class="chat"><span class="author">${data.author}: </span> <span class="content">${data.content}</span></p>`
    $('#chat_wall').append(newChat);
  })

});
