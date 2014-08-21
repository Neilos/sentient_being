describe("SentientBeing inherits from parent;", function() {
  var Human, Ape, bob;

  beforeEach(function() {
    Ape = {};
    Ape.prototype = {};
    Ape.prototype.communicate = function() { return "ook" };
    Human = SentientBeing({ parent : Ape });
    bob = new Human();
  });

  describe("the returned constructor function", function() {

    it("has a parent property that is set to the specified parent's prototype", function() {
      expect(Human.parent).toBe(Ape.prototype);
    })

    describe("an attribute inherited from the parent's prototype", function() {

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

    describe("an object instance", function() {

      it("has a parent property that is set to the parent", function() {
        expect(bob.parent).toBe(Ape);
      });

      describe("when parent is a constructor function", function() {

        it("is an instanceof <parent>", function() {
          var Monkey = function() {};
          var SpiderMonkey = SentientBeing({ parent : Monkey })
          var fred = new SpiderMonkey();
          console.log(fred.parent);
          expect(fred instanceof fred.parent).toEqual(true);
        });

      });

    });

  });

});


