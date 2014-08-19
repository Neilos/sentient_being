describe("Calling SentientBeing", function() {
  var being;
  var being2;

  describe("as a constructor", function() {

    describe("creates a new object", function() {

      it("that is distinct from other sentient beings", function() {
        being = SentientBeing();
        expect(typeof being).toBe("object");

        being2 = SentientBeing();
        expect(typeof being2).toBe("object");

        expect(being).not.toBe(being2);
      });

      it("with a 'bringToLife' function", function() {
        expect(being.bringToLife).toBeDefined();
      });

    });

  });

  describe("as a function", function() {

    describe("creates a new object", function() {

      it("that is distinct from other sentient beings", function() {
        being = SentientBeing();
        expect(typeof being).toBe("object");

        being2 = SentientBeing();
        expect(typeof being2).toBe("object");

        expect(being).not.toBe(being2);
      });

      it("with a 'bringToLife' function", function() {
        expect(being.bringToLife).toBeDefined();
      });

    });

  });

});