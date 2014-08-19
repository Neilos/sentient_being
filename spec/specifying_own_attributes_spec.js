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

    it("creates a new object with the attributes specified", function() {
      expect(being.hair).toEqual("short");
      expect(being.speed).toEqual(5);
      being.run();
      expect(being.speed).toEqual(10);
      expect(being.identity).toBe(being);
      expect(being.catchphrase).toEqual("whaaaat?????");
    });

    it("attributes specified outside the 'bringToLife' function have access to attributes within the 'bringToLife' function", function() {
      expect(being.speedInWords()).toEqual("slow");
    })

    it("attributes are NOT shared between multiple objects", function() {
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

  describe("using personal pronouns instead of 'this',", function() {

    beforeEach(function() {
      being = new SentientBeing({
        bringToLife : function(me, my, I) {
          my.hair = "short";
          my.speed = 5;
          I.run = function() {
            my.speed = my.speed * 2;
          };
          my.identity = me;
        },
        catchphrase : "whaaaat?????",
        speedInWords : function() {
          if (me.speed > 5) {
            return "fast";
          } else {
            return "slow"
          }
        }
      });
    });

    it("a new object is created with the attributes specified", function() {
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

});
