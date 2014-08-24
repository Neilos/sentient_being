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
        return "softly creeping up"
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
      expect(garfield.hunt()).toEqual("softly creeping up");
      expect(garfield.biteHuman).toEqual(false);
      expect(garfield.beStroked()).toEqual("purrrrrrrr");
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

    describe("when inheriting from an ancestor species that includes roles", function() {
      var Tiger, tigger

      beforeEach(function() {
        circusAnimal = {
          lookSad : true,
          hunt : function() {
            return "alas no more"
          }
        }

        Tiger = Species({
          parent: Cat,
          roles: [ circusAnimal ],
          bringToLife : function() {
            return function() {
              this.expressContentment = "growl";
            };
          }
        });

        tigger = new Tiger("tigger");
      });

      it("overwrites the role attributes inherited from the ancestor species (as normal)", function() {
        expect(tigger.expressContentment).toEqual("growl");
      });

      it("gains attributes from roles over attributes from ancestor species", function() {
        expect(tigger.hunt()).toEqual("alas no more");
      });

    });

  });

});
