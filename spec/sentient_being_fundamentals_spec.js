describe("SentientBeing", function() {
  var Human, bob;

  beforeEach(function() {
    Human = SentientBeing();
    bob = new Human();
  });

  it("returns a constructor function", function() {
    expect(typeof Human).toBe("function");
    expect(typeof new Human()).toBe("object");
  });

  describe("the returned constructor function", function() {

    it("is God", function() {
      expect(Human.name).toEqual("God");
    });

  });

  describe("object created with a SentientBeing constructor function", function() {

    it("is a 'typeof' object", function() {
      expect(typeof bob).toEqual("object");
    })

    it("is an instance of the constructor function", function() {
      expect(bob instanceof Human).toBe(true);
    });

    it("was constructed by 'God'", function() {
      expect(bob.constructor.name).toEqual("God");
    });

  });

  describe("God", function() {
    var god;

    beforeEach(function() {
      god = bob.constructor;
    })

    it("has a name", function() {
      expect(god.name).toEqual("God");
    });

    it("was constructed by God", function() {
      expect(god.constructor).toBe(god)
      expect(god.constructor.name).toEqual("God")
    })

    it("has a prototype that was constructed by God", function() {
      expect(Human.prototype.constructor).toBe(god)
      expect(Human.prototype.constructor.name).toEqual("God")
    })

  });

});


