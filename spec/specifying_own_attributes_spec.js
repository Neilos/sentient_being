describe("Specifying own attributes,", function() {
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
        }
      });
    });

    it("the object is created with the attributes specified in the 'bringToLife' function", function() {
      expect(being.hair).toEqual("short");
      expect(being.speed).toEqual(5);
      being.run();
      expect(being.speed).toEqual(10);
      expect(being.identity).toBe(being);
    });

    it("attributes are NOT shared between objects", function() {
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
        }
      });
    });

    it("the object is created with the attributes specified in the 'bringToLife' function", function() {
      expect(being.hair).toEqual("short");
      expect(being.speed).toEqual(5);
      being.run();
      expect(being.speed).toEqual(10);
      expect(being.identity).toBe(being);
    });

    it("attributes are NOT shared between objects", function() {
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
