describe("Specifying attributes by passing in an object,", function() {
  var being, being2;

  describe("using 'this',", function() {

    beforeEach(function() {
      being = new SentientBeing({
        bringToLife : function() {
          this.hair = "short";
          this.speed = 5;
          this.run = function() {
            this.speed = this.speed * 2;
          };
          this.identity = this;
          this.stateCatchphrase = function() {
            return this.catchphrase;
          }
          var secret = "shhhh";
          this.announceSecret = function() {
            return secret;
          }
        },
        catchphrase : "whaaaat?????",
        speedInWords : function() {
          if (this.speed > 5) {
            return "fast";
          } else {
            return "slow"
          }
        }
      });
    });

    describe("creates a new object", function() {

      it("with the attributes specified", function() {
        expect(being.hair).toEqual("short");
        expect(being.speed).toEqual(5);
        being.run();
        expect(being.speed).toEqual(10);
        expect(being.identity).toBe(being);
        expect(being.catchphrase).toEqual("whaaaat?????");
      });

      it("with attributes specified outside the 'bringToLife' function having access to attributes within the 'bringToLife' function", function() {
        expect(being.speedInWords()).toEqual("slow");
      })

      it("with attributes specified within the 'bringToLife' function having access to other attributes", function() {
        expect(being.stateCatchphrase()).toEqual("whaaaat?????");
      })

      it("with attributes NOT shared between multiple objects", function() {
        being2 = new SentientBeing({
          bringToLife : function() {
            this.hair = "long";
            this.speed = 7;
            this.run = function() {
              this.speed = this.speed * 3;
            };
            this.identity = this;
          }
        });
        expect(being.identity).toEqual(being);
        expect(being2.identity).toBe(being2);

        expect(being.hair).toEqual("short");
        expect(being2.hair).toEqual("long");

        expect(being.speed).toEqual(5);
        expect(being2.speed).toEqual(7);
        expect(being.speed).toEqual(5);

        being.run();
        being2.run();

        expect(being.speed).toEqual(10);
        expect(being2.speed).toEqual(21);
      });

    });

    it("private attributes can be declared with local variables within the 'bringToLife' function", function() {
      expect(being.secret).toBe(undefined); // not accessible outside the object
      expect(being.announceSecret()).toEqual("shhhh");
    });

  });

  describe("using personal pronouns instead of 'this',", function() {

    beforeEach(function() {
      being = new SentientBeing({
        bringToLife : function(me, my, I, I_can, p5, p6, p7, p8, p9, p10, p11) {
          my.hair = "short";
          my.speed = 5;
          I.run = function() {
            my.speed = my.speed * 2;
          };
          my.identity = me;
          I_can.stateCatchphrase = function() {
            return my.catchphrase;
          };
          var secret = "shhhh";
          I_can.announceSecret = function() {
            return secret;
          };
          I_can.sayPersonalPronouns = function() {
            return [me, my, I, I_can, p5, p6, p7, p8, p9, p10, p11];
          };
        },
        catchphrase : "whaaaat?????",
        speedInWords : function() {
          // Will throw 'me' not defined exception
          if (me.speed > 5) {
            return "fast";
          } else {
            return "slow"
          }
        }
      });
    });

    it("can use an arbitrary number of personal pronouns and all specified will be created", function() {
      var pronouns = being.sayPersonalPronouns();
      for (var i = 0; i < pronouns.length; i++) {
        expect(pronouns[i]).toBe(being);
      }
    });

    describe("creates a new object", function() {

      it("with the attributes specified", function() {
        expect(being.hair).toEqual("short");
        expect(being.speed).toEqual(5);
        being.run();
        expect(being.speed).toEqual(10);
        expect(being.identity).toBe(being);
        expect(being.catchphrase).toEqual("whaaaat?????");
      });

      it("attributes specified outside the 'bringToLife' function do NOT have access to personal pronoun syntax", function() {
        expect(being.speedInWords).toThrow();
      })

      it("attributes specified within the 'bringToLife' function can access other attributes with personal pronoun syntax", function() {
        expect(being.stateCatchphrase()).toEqual("whaaaat?????");
      })

      it("attributes are NOT shared between multiple objects", function() {
        being2 = new SentientBeing({
          bringToLife : function(me, my, I) {
            my.hair = "long";
            my.speed = 7;
            I.run = function() {
              my.speed = my.speed * 3;
            };
            my.identity = me;
          }
        });
        expect(being.identity).toEqual(being);
        expect(being2.identity).toBe(being2);

        expect(being.hair).toEqual("short");
        expect(being2.hair).toEqual("long");

        expect(being.speed).toEqual(5);
        expect(being2.speed).toEqual(7);
        expect(being.speed).toEqual(5);

        being.run();
        being2.run();

        expect(being.speed).toEqual(10);
        expect(being2.speed).toEqual(21);
      });

    });

    it("private attributes can be declared with local variables within the 'bringToLife' function", function() {
      expect(being.secret).toBe(undefined); // not accessible outside the object
      expect(being.announceSecret()).toEqual("shhhh");
    });

  });

});
