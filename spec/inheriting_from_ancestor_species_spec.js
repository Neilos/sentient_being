describe("Species inheriting from an ancestor species;", function() {
  var Human, Ape, bob;

  beforeEach(function() {
    Ape = { dexterity : "poor" };
    Ape.prototype = {};
    Ape.prototype.communicate = function() { return "ook" };
    Human = Species({ ancestorSpecies : Ape });
    bob = new Human();
  });

  describe("an attribute of the ancestor species (i.e. non-prototype attributes)", function() {

    describe("when the ancestor species is a plain old javascript object", function() {

      it("attribute is NOT inherited", function() {
        expect(bob.dexterity).toBe(undefined);
      });

    });

    describe("when ancestor species is another species (not just a POJO)", function() {
      var Vulcan, Romulan, remus, spock

      beforeEach(function() {

        Vulcan = new Species({
          bringToLife: function() {
            this.haircut = "not an attribute"; // not an attribute of Vulcan
            return function() {
              this.ears = "pointy";
              this.emotional = false;
            };
          },
          homeworld : "Vulcan"
        });

        Romulan = Species({
          ancestorSpecies : Vulcan,
          bringToLife: function() {
            return function() { this.emotional = true; };
          }
        });

        remus = new Romulan();
        spock = new Vulcan();
      });

      it("ancestor species' attributes are inherited as properties belonging to the child", function() {
        expect(remus.ears).toEqual("pointy");
        expect(remus.hasOwnProperty("ears")).toBe(true);
      });

      it("attributes declared on the ancestor species's prototype are accessible via an object instance's prototype", function() {
        expect(remus.homeworld).toBe("Vulcan");
        expect(remus.hasOwnProperty("homeworld")).toBe(false);
        if (Object.prototype.hasOwnProperty("__proto__")) {
          var remusDNA = remus.__proto__;
          expect("homeworld" in remusDNA).toBe(true);

          var ancestorSpeciesDNA = remusDNA.__proto__;
          var spockDNA = spock.__proto__;
          expect(ancestorSpeciesDNA).toBe(spockDNA);
          expect(ancestorSpeciesDNA.hasOwnProperty("homeworld")).toBe(true);
        }
      });

      it("ancestor species attributes do not overwrite child attributes", function() {
        expect(remus.emotional).toBe(true);
      });

    });

  });

  describe("an attribute inherited from the ancestor species' prototype", function() {

    it("can be called on object instances", function() {
      expect(bob.communicate()).toEqual("ook");
    });

    it("is not a property of object instances", function() {
      expect("communicate" in bob).toBe(true);
      expect(bob.hasOwnProperty("communicate")).toBe(false);
    });

    it("is not property of the contructor function", function() {
      expect(Human.hasOwnProperty("communicate")).toBe(false);
    });

    it("can be overridden in the constructor function's prototype", function() {
      Human.prototype.communicate = function() { return "How do you do"; };
      expect(bob.communicate()).toEqual("How do you do");
      delete Human.prototype.communicate
      expect(bob.communicate()).toEqual("ook");
    });

  });

  describe("the returned constructor function", function() {

    it("has a ancestorSpecies property that is set to the specified ancestorSpecies's prototype", function() {
      expect(Human.ancestorSpecies).toBe(Ape.prototype);
    });

  });

  describe("an object instance", function() {

    it("has a ancestorSpecies property that is set to the ancestorSpecies", function() {
      expect(bob.ancestorSpecies).toBe(Ape);
    });

    describe("when ancestorSpecies is a constructor function", function() {

      it("is an instanceof <ancestorSpecies>", function() {
        var Monkey = function() {};
        var SpiderMonkey = Species({ ancestorSpecies : Monkey })
        var fred = new SpiderMonkey();
        console.log(fred.ancestorSpecies);
        expect(fred instanceof fred.ancestorSpecies).toEqual(true);
      });

    });

  });

});


