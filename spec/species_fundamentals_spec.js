describe("Species", function() {
  var Human, bob;

  beforeEach(function() {
    Human = Species();
    bob = new Human();
  });

  it("is a function", function() {
    expect(typeof Species).toBe('function');
  });

  it("was constructed by Function", function() {
    expect(Species.constructor).toBe(Function);
  });

  it("returns a constructor function", function() {
    expect(typeof Human).toBe("function");
    expect(typeof new Human()).toBe("object");
  });

  describe("the returned constructor function", function() {

    it("is a Species", function() {
      expect(Human.name).toEqual("Species");
    });

    it("is not the Species function", function() {
      expect(Human).not.toBe(Species);
    });

    it("was constructed by God", function() {
      expect(Human.prototype.constructor.name).toEqual("God");
    });

  });

  describe("an object instance created with a Species constructor function", function() {

    it("is a 'typeof' object", function() {
      expect(typeof bob).toEqual("object");
    });

    it("is an 'instanceof' Object", function() {
      expect(bob instanceof Object).toBe(true);
    });

    it("is an 'instanceof' the Species type (aka constructor function)", function() {
      expect(bob instanceof Human).toBe(true);
    });

    it("is NOT an 'instanceof' Species", function() {
      expect(bob instanceof Species).toBe(false);
    });

    it("was constructed by God", function() {
      expect(bob.constructor.name).toEqual("God");
    });

  });

  it("For all species there is only one God", function() {
    var god1 = Human.prototype.constructor; // creator of a species
    var god2 = bob.constructor; // creator of instances of a species
    var god3 = god1.constructor; // creator of god(s)
    var god4 = god1.prototype.constructor; // creator of god's likeness
    var jane = new Human();
    var god5 = jane.constructor;  // creator of another instance of the same species
    var Elephant = Species();
    var god6 = Elephant.prototype.constructor; // creator of another species
    expect(god1 === god2 && god2 === god3 && god3 === god4 && god4 === god5 && god5 === god6).toBe(true);
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

    it("is his own prototype", function() {
      expect(god.prototype).toBe(god);
      expect(god.prototype.name).toBe("God");
    });

    it("was constructed by God", function() {
      expect(god.prototype.constructor).toBe(god);
      expect(god.prototype.constructor.name).toEqual("God");
    })

    it("is NOT the Species function", function() {
      expect(god instanceof Species).toBe(false);
      expect(god).not.toBe(Species);
    });

    it("knows the meaning of life", function() {
      expect(god.meaningOfLife).toEqual(42);
    })

  });

});
