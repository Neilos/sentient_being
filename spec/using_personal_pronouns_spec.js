describe("using personal pronouns", function() {
  var Duck, daffy;

  beforeEach(function() {
    Duck = Species({
      bringToLife : function(my, I) {
        my.underpants = "pink" // Wrong! No ducks will have any underpants.
        return function(name) {
          my.name = name;
          I.sayName = function() {
            return "My name is " +  my.name;
          }
        }
      }
    });
  });

  describe("specifying a list of pronouns in the argument list for the outer 'bringToLife' function", function() {

    it("makes it possible to use personal pronouns in place of the 'this' keyword", function() {
      var usePersonalPronouns = function() {
        daffy = new Duck("daffy");
      }
      expect(usePersonalPronouns).not.toThrow();
    });

  });




});