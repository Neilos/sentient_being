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

    it("is also a Species but is not THE Species", function() {
      expect(Human.name).toEqual("Species");
      expect(Human).not.toBe(Species);
    });

    it("was constructed by God", function() {
      expect(Human.constructor.name).toEqual("God");
    });

  });

  describe("object instance created with a Species constructor function", function() {

    it("is a 'typeof' object", function() {
      expect(typeof bob).toEqual("object");
    });

    it("is an 'instanceof' Object", function() {
      expect(bob instanceof Object).toBe(true);
    });

    it("is an 'instanceof' the constructor function", function() {
      expect(bob instanceof Human).toBe(true);
    });

    it("was constructed by God", function() {
      expect(bob.constructor.name).toEqual("God");
    });

  });

  it("Within a species there is only one God", function() {
    var jane = new Human();
    var god1 = Human.constructor;
    var god2 = bob.constructor;
    var god3 = god1.constructor;
    var god4 = god1.prototype.constructor;
    var god5 = jane.constructor;
    expect(god1 === god2 && god2 === god3 && god3 === god4 && god4 === god5).toBe(true);
  });

  it("Each species has a different God", function() {
    var Elephant = Species();
    var elephantGod = Elephant.constructor;
    var humanGod = Human.constructor;
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

    it("was constructed by God", function() {
      expect(god.constructor).toBe(god);
      expect(god.constructor.name).toEqual("God");
    })

    it("has a prototype that was constructed by God", function() {
      expect(god.prototype.constructor).toBe(god)
      expect(god.prototype.constructor.name).toEqual("God")
    })

    it("is not a Species", function() {
      expect(god instanceof Species).toBe(false);
      expect(god).not.toBe(Species);
    });

  });

});


