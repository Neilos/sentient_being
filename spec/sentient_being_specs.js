describe("SentientBeing", function() {
  var being;
  var being2;

  describe("acts as a constructor function", function() {

    it("creates a new object", function() {
      being = new SentientBeing();
      expect(typeof being).toBe("object");

      being2 = new SentientBeing();
      expect(typeof being2).toBe("object");

      expect(being).not.toBe(being2);
    });

  });

});