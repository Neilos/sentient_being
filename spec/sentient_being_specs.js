describe("SentientBeing", function() {
  var Human;

  it("returns a constructor function", function() {
    Human = SentientBeing();
    expect(typeof Human).toBe("function");
    expect(typeof new Human()).toBe("object");
  });



});
