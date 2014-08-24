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

  it("Within a species there is only one God", function() {
    var jane = new Human();
    var god1 = Human.prototype.constructor;
    var god2 = bob.constructor;
    var god3 = god1.constructor;
    var god4 = god1.prototype.constructor;
    var god5 = jane.constructor;
    expect(god1 === god2 && god2 === god3 && god3 === god4 && god4 === god5).toBe(true);
  });

  it("Each species has a different God", function() {
    var Elephant = Species();
    var elephantGod = Elephant.prototype.constructor;
    var humanGod = Human.prototype.constructor;
    expect(elephantGod === humanGod).toBe(false);
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

    it("returns new types of species (just like the Species function)", function() {
      var Dog = god();
      expect(Dog.name).toEqual("Species")
    });

    it("is NOT the Species function", function() {
      expect(god instanceof Species).toBe(false);
      expect(god).not.toBe(Species);
    });

    it("can speak", function() {
      expect(god.speak()).toEqual("I AM GOD");
    })

    it("knows the meaning of life", function() {
      expect(god.meaningOfLife).toEqual(42);
    })

  });

});


