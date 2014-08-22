describe("using personal pronouns", function() {
  var Duck, daffy;

  beforeEach(function() {
    Duck = Species({
      bringToLife : function(my) {
        my.underpants = "pink" // Wrong! No ducks will have any underpants.
        return function(name) {
          my.name = name;
          this.sayName = function() {
            return "My name is " +  my.name;
          }
        }
      }
    });
    daffy = new Duck("daffy");
  });



});