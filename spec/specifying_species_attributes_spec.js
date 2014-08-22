describe("Species;", function() {
  var Human, bob;

  beforeEach(function() {
    Human = Species({
      bringToLife: function() {
        return function(name) {
          this.name = name;
          this.sayName = function() {
            return "My name is " +  this.name;
          }
        }
      }
    });
    bob = new Human("bob");
  });

  describe("an object instance", function() {

    it("has the attributes specified in the 'bringToLife' function", function(){
      expect(bob.name).toEqual("bob");
      expect(bob.sayName()).toEqual("My name is bob");
    });

    it("can override a specified attribute", function() {
      expect(bob.sayName()).toEqual("My name is bob");
      bob.sayName = function() { return "I'm not telling" };  // redefine the function
      expect(bob.sayName()).toEqual("I'm not telling");
    });

    it("has attributes that are completely separate from other object instances", function() {
      jane = new Human("jane");
      expect(jane.sayName()).toEqual("My name is jane");
      bob.sayName = function() { return "I'm not telling" };  // redefine bob's function
      expect(jane.sayName()).toEqual("My name is jane");  // jane's function is not affected
      bob.sayName = jane.sayName;  // restore the function to bob
      expect(bob.sayName()).toEqual("My name is bob");
    });

  });

});