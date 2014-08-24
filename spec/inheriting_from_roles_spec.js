describe("Specifying roles:", function() {
  var Cat, garfield, pet, predator;

  beforeEach(function() {
    pet = {
      beStroked : function() {
        return this.expressContentment;
      },
      biteHuman : false,
      expressContentment : "sigh"
    };

    predator = {
      hunt : function() {
        return "softly creeping up."
      },
      biteHuman : true
    };

    Cat = Species({
      bringToLife : function() {
        this.expressContentment = "purrrrrrrr"
        return function(name) {
          this.name = name;
        };
      },
      roles : [ predator, pet ]
    });

    garfield = new Cat("garfield");

  });


  describe("a species", function() {

    it("has a roles attribute", function() {
      expect(garfield.roles).toEqual([ predator, pet ]);
    });

    it("gains the same attributes as the specifed role objects", function(){
      expect(garfield.hunt).not.toBe(undefined);
      expect(garfield.biteHuman).not.toBe(undefined);
      expect(garfield.beStroked).not.toBe(undefined);
    });

    it("still has its own attributes, which take precedence over the role attributes", function() {
      expect(garfield.expressContentment).toEqual("purrrrrrrr");
      expect(garfield.beStroked()).toEqual("purrrrrrrr");
    });

    describe("when multiple roles have the same attribute", function(){

      it("gains the attributes of the last listed role", function() {
        expect(garfield.biteHuman).toEqual(false);
      });

    });

  });

});
