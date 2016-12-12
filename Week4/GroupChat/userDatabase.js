"use strict";
class UserDatabase{
  constructor(){
    var users = {};
    this.addUser = function(id, name){
      users[id] = name;
    }
    this.deleteUser = function(id){
      delete users[id];
    }
    this.getName = function(id){
      if (id in users) {
        return users[id];
      }
      return false;
    }
    this.getUsers = function(){
      return users;
    }
    this.showUsers = function(){
      console.log(users);
    }
  }
}

module.exports = new UserDatabase();
