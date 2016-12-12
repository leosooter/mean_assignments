"use strict";
class chatDatabase{
  constructor(){
    var test = 'Test';
    var chats = [];
    this.addChat = function(author, content){
      chats.push({author : author, content : content});
    }
    this.getChats = function(){
      return chats;
    }
    this.showChats = function(){
      console.log(chats);
    }
    this.test = function(){
      console.log(test);
    }
  }
}

module.exports = new chatDatabase();
