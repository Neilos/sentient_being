describe("Calling SentientBeing", function() {
  var being;
  var being2;

  describe("as a constructor", function() {

    it("creates a new object", function() {
      being = new SentientBeing();
      expect(typeof being).toBe("object");

      being2 = new SentientBeing();
      expect(typeof being2).toBe("object");

      expect(being).not.toBe(being2);
    });

  });

  describe("as a function", function() {

    it("creates a new object", function() {
      being = SentientBeing();
      expect(typeof being).toBe("object");

      being2 = SentientBeing();
      expect(typeof being2).toBe("object");

      expect(being).not.toBe(being2);
    });

  });

});