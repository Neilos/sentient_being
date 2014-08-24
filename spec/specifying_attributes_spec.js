describe("Species attributes", function() {
  var Human, bob;

  beforeEach(function() {
    Human = Species({
      bringToLife: function() {
        this.job = "pastry chef";
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

  describe("object instance", function() {

    it("has the attributes specified in the 'bringToLife' function", function(){
      expect(bob.name).toEqual("bob");
      expect(bob.sayName()).toEqual("My name is bob");
      expect(bob.job).toEqual("pastry chef");
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

    describe("when 'bringToLife' function does not define an inner function", function() {
      var Car, mercedes;
      beforeEach(function(){
        Car = Species({
          bringToLife : function() {
            this.wheels = 4;
          }
        });
        mercedes = new Car();
      });

      it("attributes are still defined", function () {
        expect(mercedes.wheels).toEqual(4);
      });

    })

  });

  describe("Object and array attributes:", function() {
    var Dog, BassetHound, fido, dogBall, dogBed, owner, collars

    beforeEach(function() {
      owner = { name : "jeff" }
      home = { name : "21 jump street" }
      collars = [ "red", "blue" ];
      dogBall = { round : true };
      dogBed = { comfy : true };
      balls = [ dogBall ];
      Dog = Species({
        home : home,
        weekendRoutine : { napTime: "never", hungry:  "always" },
        petNames : ["boy", "dog", "dumb mutt"],
        knownThings : [owner, home, dogBall, dogBed],
        bringToLife : function() {
          this.owner = owner;
          this.barkTypes = ["bark", "woof"];
          this.collars = collars
          this.weekdayRoutine = { napTime: "every hour", hungry:  "every hour" };
          this.favouriteThings = [ dogBall, dogBed ];
        }
      });
      rover = new Dog();
      fido = new Dog();
    });

    describe("an object attribute", function() {

      describe("defined inside the species definition", function() {

        describe("and inside the 'bringToLife' function", function() {

          it("is NOT shared with other species instances", function() {
            expect(fido.weekdayRoutine).not.toBe(rover.weekdayRoutine);
          });

        });

        describe("but outside the 'bringToLife' function", function() {

          it("IS shared with other species instances", function() {
            expect(fido.weekendRoutine).toBe(rover.weekendRoutine);
          });

        });

      });

      describe("defined outside the species definition", function() {

        it("is shared with other species instances", function() {
          expect(fido.owner).toBe(rover.owner);
          expect(fido.home).toBe(rover.home);
        });

      });

    });

    describe("an array attribute", function() {

      describe("defined inside the species definition", function() {

        describe("inside the bringToLife' function", function() {

          it("is NOT shared with other species instances", function() {
            expect(fido.barkTypes).not.toBe(rover.barkTypes);
            expect(fido.favouriteThings).not.toBe(rover.favouriteThings);
          });

        });

        describe("but outside the 'bringToLife' function", function() {

          it("IS shared with other species instances", function() {
            expect(fido.petNames).toBe(rover.petNames);
            expect(fido.knownThings).toBe(rover.knownThings);
          });

        });

      });

      describe("defined outside the species definition", function() {

        it("IS shared with other species instances", function() {
          expect(fido.collars).toBe(rover.collars);
          expect(fido.balls).toBe(rover.balls);
        })

      });

    });

  });

});

