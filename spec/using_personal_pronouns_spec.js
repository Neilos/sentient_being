describe("Using personal pronouns", function() {
  var Duck, Duck, daffy, woody;

  beforeEach(function() {
    Bird = Species({
      bio : function(my, I) {
        I.sayName = function() {
          return "My name is " +  my.name;
        }
        return function(name) {
          my.name = name;
        }
      }
    });
  });

  describe("specifying a list of pronouns in the argument list for the outer 'bio' function", function() {

    it("makes it possible to use personal pronouns in place of the 'this' keyword", function() {
      var usePersonalPronouns = function() {
        woody = new Bird("woody");
      }
      expect(usePersonalPronouns).not.toThrow();
      expect(woody.name).toEqual("woody");
      expect(woody.sayName()).toEqual("My name is woody");
    });

  });

  describe("when inheriting from a ancestor species", function() {

    beforeEach(function() {
      Duck = new Species({
        ancestorSpecies : Bird,
        bio : function(my, I) {
          I.quack = function(words) {
            return "quack! " + words + " quack!"
          }
          return function(name, hat, underpants) {
            my.hat = hat;
            my.underpants = underpants;
          }
        }
      });
      daffy = new Duck("daffy", "sailor", null);
    });

    it("can use personal pronouns in both the species and ancestorSpecies definitions", function() {
      expect(daffy.name).toEqual("daffy");
      expect(daffy.sayName()).toEqual("My name is daffy");
      expect(daffy.hat).toEqual("sailor");
      expect(daffy.quack("hello")).toEqual("quack! hello quack!");
    });

  });

});