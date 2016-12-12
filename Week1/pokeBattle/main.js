$(document).ready(function() {
  console.log("Jquery has loaded");
  var pokeLoaded = false;
  var pokeArray =[];
  getPokes();
  var game_info = $('#info');
  var game = {
    players: [],
    addPlayer: function(name){
      console.log("Adding player");
      game.players.push(playerConstructor(name));
      createPlayer(name);
    },
    draw : function(){
      $('.card').html('');
      $('.player').removeClass('winner');
      var i = 0;
      loopPlayers();
      function loopPlayers(){
        var player = game.players[i];
        var pokeId = Math.floor((Math.random() * 151) + 1);
        console.log("Making new Ajax call- id = " + pokeId);
        $.ajax({
          url : 'http://pokeapi.co/api/v1/pokemon/' + pokeId + '/',
          dataType: 'json',
          success : function(poke){
            console.log("Creating new card");
            player.card = poke.attack;
            $(`#${player.name}_card`).html(`<img src="http://pokeapi.co/media/img/${pokeId}.png" height="240" width="240" alt="pokemon_card" /><span class="attack"><strong>${poke.name}~</strong> Attack: ${poke.attack}</span>`);
            i ++;
            if(i < game.players.length){
              loopPlayers();
            }
            else{
              compareCards();
            }
          },
        });
      }
    },
  };
  function getPokes(){

  }
  function playerConstructor(name){
    var player = {};
    player.name = name;
    player.card = null;
    return player;
  }

  //Adds new player to the DOM
  function createPlayer(name){
    console.log("Creating new player in the DOM");
    new_player = `<div id="${name}_player" class="player"><h3>${name}</h3><h3 class="winner_text"> Winner!</h3><div id="${name}_card" class="card"></div></div>`;
    $('.game_wrapper').append(new_player);
  }

  function compareCards(){
    var highCard = 0;
    var winner;
    var tie = [];
    for (var i = 0; i < game.players.length; i++) {
      if(game.players[i].card > highCard){
        highCard = game.players[i].card;
        winner = game.players[i].name;
        tie = [];
      }
      else if(game.players[i].card === highCard){
        console.log("Tie found");
        tie.push(game.players[i].name);
      }
    }
    if(tie.length){
      console.log("It was a tie");
      $('#info').text("Tie!");
      for(var index in tie){
        $(`#${tie[index]}_player`).addClass('winner');
      }
      $(`#${winner}_player`).addClass('winner');
    }
    else{
      $(`#${winner}_player`).addClass('winner');
    }
  }

  $('#add_player').click(function(){
    console.log("add_player clicked");
    game_info.text("");
    game_info.removeClass();
    var name = $('#new_player_name').val();
    if(name){
      game.addPlayer(name);
    }
    else{
      game_info.text("You must enter a name to create a new player");
      game_info.addClass('error');
    }
  });

  $('#draw').click(function(){
    game_info.text("");
    game_info.removeClass();
    if(game.players.length > 1){
      game.draw();
    }
    else{
      game_info.text("You must create at least two players to play");
      game_info.addClass('error');
    }
  });

  $('#new_game').click(function(){
    game.players = [];
    $('.player').remove();
  });

});
