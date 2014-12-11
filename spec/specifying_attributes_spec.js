describe("Species attributes", function() {

  describe("a primitive attribute", function() {
    var alice, bill

    beforeEach(function() {
      Human = Species({
        age: 50,
        bio: function() {
          this.job = "truck driver";
          return function(name) {
            this.name = name;
          }
        }
      });
      alice = new Human("alice");
      bill = new Human("bill");
    });

    describe("defined inside the species definition", function() {

      describe("and inside the 'bio' function", function() {

        describe("inside the inner function", function() {

          it("can be set during object initialization", function() {
            expect(alice.name).toBe("alice")
            expect(bill.name).toBe("bill")
          })

          it("is NOT shared with other species instances", function() {
            bill.name = "william"
            expect(bill.name).toBe("william")
            expect(alice.name).not.toBe(bill.name);
          });

        });

        describe("outside the inner function", function() {

          it("is NOT shared with other species instances", function() {
            expect(alice.job).toBe(bill.job);
            alice.job = "tank driver"
            expect(alice.job).not.toBe(bill.job);
          });

        });

        describe("when 'bio' function does not define an inner function", function() {
          var Car, mercedes;

          beforeEach(function(){
            Car = Species({
              bio : function() {
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

      describe("but outside the 'bio' function", function() {

        it("IS shared with other species instances", function() {
          expect(alice.age).toBe(50);
          expect(bill.age).toBe(50);
          alice.age = 40
          expect(alice.age).toBe(40);
          expect(bill.age).toBe(50);
        });

      });

    });

  });

  describe("a function attribute", function() {
    var Human, bob;

    beforeEach(function() {
      Human = Species({
        age: 50,
        sayAge: function() {
          return "My age is " +  this.age;
        },
        bio: function() {
          this.sayJob = function() {
            return "My job is " +  this.job;
          }
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
      jane = new Human("jane");
    });

    it("'this' correctly refers to the object instance", function() {
      jane = new Human("jane");
      expect(jane.sayName()).toEqual("My name is jane");
      bob.sayName = function() { return "I'm not telling" };  // redefine bob's function
      expect(jane.sayName()).toEqual("My name is jane");  // jane's function is not affected
      bob.sayName = jane.sayName;  // restore the function to bob
      expect(bob.sayName()).toEqual("My name is bob");

      expect(jane.job).toEqual("pastry chef");
      expect(bob.job).toEqual("pastry chef");
      jane.job = "head chef"
      expect(jane.job).toEqual("head chef");
      expect(bob.job).toEqual("pastry chef");

      expect(jane.age).toEqual(50);
      expect(bob.age).toEqual(50);
      jane.age = 40
      expect(jane.age).toEqual(40);
      expect(bob.age).toEqual(50);
    });

    describe("defined inside the species definition", function() {

      describe("and inside the 'bio' function", function() {

        describe("inside the inner function", function() {

          it("is NOT shared with other species instances", function() {
            expect(bob.sayName).not.toBe(jane.sayName);
          });

        });

        describe("outside the inner function", function() {

          it("is NOT shared with other species instances", function() {
            expect(jane.sayJob).not.toBe(bob.sayJob);
          });

        });

      });

      describe("but outside the 'bio' function", function() {

        it("IS shared with other species instances", function() {
          expect(jane.sayAge).toBe(bob.sayAge);
        });

      });

    });

  });

  describe("an 'object' or 'array' attribute:", function() {
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
        bio : function() {
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

    describe("defined inside the species definition", function() {

      describe("and inside the 'bio' function", function() {

        it("is NOT shared with other species instances", function() {
          expect(fido.weekdayRoutine).not.toBe(rover.weekdayRoutine);

          expect(fido.barkTypes).not.toBe(rover.barkTypes);
          expect(fido.favouriteThings).not.toBe(rover.favouriteThings);
        });

      });

      describe("but outside the 'bio' function", function() {

        it("IS shared with other species instances", function() {
          expect(fido.weekendRoutine).toBe(rover.weekendRoutine);

          expect(fido.petNames).toBe(rover.petNames);
          expect(fido.knownThings).toBe(rover.knownThings);
        });

      });

    });

    describe("defined outside the species definition", function() {

      it("IS shared with other species instances", function() {
        expect(fido.owner).toBe(rover.owner);
        expect(fido.home).toBe(rover.home);

        expect(fido.collars).toBe(rover.collars);
        expect(fido.balls).toBe(rover.balls);
      });

    });

  });

});

