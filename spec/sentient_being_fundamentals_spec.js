describe("SentientBeing", function() {
  var Human, bob;

  beforeEach(function() {
    Human = SentientBeing();
    bob = new Human();
  });

  it("is a function", function() {
    expect(typeof SentientBeing).toBe('function');
  });

  it("was constructed by Function", function() {
    expect(SentientBeing.constructor).toBe(Function);
  });

  it("returns a constructor function", function() {
    expect(typeof Human).toBe("function");
    expect(typeof new Human()).toBe("object");
  });

  describe("the returned constructor function", function() {

    it("is also a SentientBeing but is not THE SentientBeing", function() {
      expect(Human.name).toEqual("SentientBeing");
      expect(Human).not.toBe(SentientBeing);
    });

    it("was constructed by God", function() {
      expect(Human.constructor.name).toEqual("God");
    });

  });

  describe("object instance created with a SentientBeing constructor function", function() {

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

  it("There is only one God", function() {
    var god1 = Human.constructor;
    var god2 = bob.constructor;
    var god3 = god1.constructor;
    var god4 = god1.prototype.constructor;
    expect(god1 === god2 && god2 === god3 && god3 === god4).toBe(true);
  });

  describe("God", function() {
    var god;

    beforeEach(function() {
      god = bob.constructor;
    });

    it("is a function", function() {
      expect(typeof god).toBe('function');
    });

    it("has a name: God", function() {
      expect(god.name).toEqual("God");
    });

    it("was constructed by God", function() {
      expect(god.constructor).toBe(god);
      expect(god.constructor.name).toEqual("God");
    })

    it("has a prototype that was constructed by God", function() {
      expect(god.prototype.constructor).toBe(god)
      expect(god.prototype.constructor.name).toEqual("God")
    })

  });

});


