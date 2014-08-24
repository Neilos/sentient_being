describe("Species inheritance:", function() {
  var Human, Ape, bob;

  beforeEach(function() {
    Ape = { dexterity : "poor" };
    Ape.prototype = {};
    Ape.prototype.communicate = function() { return "ook" };
    Human = Species({ ancestorSpecies : Ape });
    bob = new Human();
  });

  describe("an attribute of the ancestor species' prototype", function() {

    it("is inherited (i.e. can be called on object instances)", function() {
      expect(bob.communicate()).toEqual("ook");
    });

    it("is not a property of a child species' instance", function() {
      expect("communicate" in bob).toBe(true);
      expect(bob.hasOwnProperty("communicate")).toBe(false);
    });

    it("can be overridden in the child Species", function() {
      Human.prototype.communicate = function() { return "How do you do"; };
      expect(bob.communicate()).toEqual("How do you do");
      delete Human.prototype.communicate
      expect(bob.communicate()).toEqual("ook");
    });

  });

  describe("a child species constructor function", function() {

    it("has a ancestorSpecies property set to the specified ancestorSpecies's prototype", function() {
      expect(Human.ancestorSpecies).toBe(Ape.prototype);
    });

  });

  describe("an instance of a Child Species", function() {

    it("has a ancestorSpecies property set to the ancestorSpecies", function() {
      expect(bob.ancestorSpecies).toBe(Ape);
    });

  });

  describe("when ancestor species is an ordinary javascript object", function() {

    describe("a direct attribute of the ancestor species (i.e. non-prototype attributes)", function() {

      it("is NOT inherited", function() {
        expect(bob.dexterity).toBe(undefined);
      });

    });

    describe("a child species object instance", function() {

      it("is NOT an 'instanceof' the ancestor species", function() {
        function isInstanceOf() { bob instanceof Ape };
        expect(isInstanceOf).toThrow();
      });

    });

  });

  describe("when ancestor species is a constructor function", function() {

    describe("a child species object instance", function() {

      it("is an 'instanceof' the ancestor species", function() {
        var Monkey = function() {};
        var SpiderMonkey = Species({ ancestorSpecies : Monkey })
        var fred = new SpiderMonkey();
        expect(fred instanceof fred.ancestorSpecies).toEqual(true);
      });

    });

  });


  describe("when ancestor species is another species (i.e. not just a POJO)", function() {
    var Vulcan, Romulan, remus, spock

    beforeEach(function() {

      Vulcan = new Species({
        bringToLife: function() {
          this.haircut = "bad";
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

      spock = new Vulcan();
      remus = new Romulan();
    });

    describe("a child species object instance", function() {

      it("is an 'instanceof' the ancestor species", function() {
        expect(remus instanceof Vulcan).toEqual(true);
      });

    });

    describe("an attribute declared in the ancestor species' 'bringToLife' function", function() {

      it("is an 'own' property of child species' object instances", function() {
        expect(remus.ears).toEqual("pointy");
        expect(remus.haircut).toEqual("bad");
        expect(remus.hasOwnProperty("ears")).toBe(true);
      });

      it("can be overridden by child species without overwriting the ancestor attribute", function() {
        expect(remus.emotional).toBe(true);
        expect(spock.emotional).toBe(false);
      });

      describe("when the ancestor species' 'bringToLife' function doesn't contain an inner function", function(){

        it("it doesn't break construction of the child", function() {
          var Mouse = new Species({
            bringToLife: function() {
              this.tail = "long";
            }
          });
          var FieldMouse = Species({ ancestorSpecies : Mouse });
          var whiskers = new FieldMouse();
          expect(whiskers.tail).toEqual("long")
        });

      });

    });

    describe("an attribute declared outside the ancestor species' 'bringToLife' function", function() {

      if (Object.prototype.hasOwnProperty("__proto__")) {
        it("is accessible by an object instance (via its prototype)", function() {
          var remusDNA = remus.__proto__;
          expect("homeworld" in remusDNA).toBe(true);

          var ancestorSpeciesDNA = remusDNA.__proto__;
          var spockDNA = spock.__proto__;
          expect(ancestorSpeciesDNA).toBe(spockDNA);
          expect(ancestorSpeciesDNA.hasOwnProperty("homeworld")).toBe(true);
        });
      }

      it("is not an 'own' property of the child object (or its prototype)", function() {
        expect(remus.homeworld).toBe("Vulcan");
        expect(remus.hasOwnProperty("homeworld")).toBe(false);
        remus.homeworld = "Earth";
        remus.__proto__.homeworld = "Romulus";
        expect(remus.homeworld).toBe("Earth");
        expect(remus.__proto__.homeworld).toBe("Romulus");
        expect(spock.homeworld).toBe("Vulcan");
      });

    });

  });


});

