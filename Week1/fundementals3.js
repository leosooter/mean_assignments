function personConstuctor(name){
   var person ={
     name,
     distance_traveled : 0,
     say_name : function(){
       console.log(person.name);
       return person;
     },
     say_something : function(speech){
       console.log(person.name + " says '" + speech + "'");
       return person;
     },
     walk : function(){
       person.distance_traveled += 3;
       console.log(person.name + " is walking");
       return person;
     },
     run : function(){
       person.distance_traveled += 10;
       console.log(person.name + " is running");
       return person;
     },
     crawl : function(){
       person.distance_traveled += 1;
       console.log(person.name + " is crawling");
       return person;
     },
   };
   return person;
}

var Leo = personConstuctor('Leo');
//Leo.say_name().walk().run();


function ninjaConstructor(name, cohort){
  var ninja = {
    name,
    cohort,
    belts : ['Yellow', 'Red', 'Black'],
    belt_level : 0,
    level_up : function(){
      if(ninja.belt_level < ninja.belts.length)
      ninja.belt_level ++;
      return ninja;
    },
    show_belt : function(){
      console.log(ninja.belts[ninja.belt_level]);
      return ninja;
    },
  };
  return ninja;
}

var Eli = ninjaConstructor('Eli', 'Python');
Eli.level_up().show_belt().level_up().show_belt();
