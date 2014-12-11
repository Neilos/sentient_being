(function() {

  var God
  God = function God() { };
  God.meaningOfLife = 42;
  God.speak = function() { return "I AM GOD" };
  God.prototype = God;
  God.prototype.constructor = God;

  God.grantFaithInGodTo = function(species) {
    species.prototype.constructor = God;
  };

  God.copyAttributes = function(whatToCopy){
    var blueprint = whatToCopy.from
    var species = whatToCopy.to
    for (attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
          species.prototype[attribute] = blueprint[attribute];
      }
    }
  };

  God.copyDNA =  function(whereToCopy) {
    var ancestorSpecies = whereToCopy.from
    var species = whereToCopy.to

    DNA = function DNA() {};
    DNA.prototype = ancestorSpecies.prototype;
    species.prototype = new DNA();
    species.ancestorSpecies = ancestorSpecies.prototype;
  };

  var Species = function(blueprint) {
    var Species, DNA, ancestorSpecies

    God.breathLifeInto = function() {


      var getIdentitiesFor = function(self, selfCount) {
        return Array.apply(null, new Array(selfCount)).map(Object.prototype.valueOf, self);
      };

      var grantHeritageAwareness = function(species) {
        var lifeForce = species.ancestorSpecies.bringToLife;
        var selfAwareness = getIdentitiesFor(this, lifeForce.length);
        var selfAwareBeing = [this].concat(selfAwareness);
        var powerOfLife = lifeForce.apply(this, selfAwareBeing)
        if (typeof powerOfLife === 'function'){
          var args = Array.prototype.slice.call(arguments, 1)
          return powerOfLife.apply(this, args);
        } else {
          return powerOfLife;
        }
      };

      var grantSelfAwareness = function(species) {
        var lifeForce = species.prototype.bringToLife;
        var selfAwareness = getIdentitiesFor(this, lifeForce.length);
        var selfAwareBeing = [this].concat(selfAwareness);
        var powerOfLife = lifeForce.apply(this, selfAwareBeing)
        if (typeof powerOfLife === 'function'){
          var args = Array.prototype.slice.call(arguments, 1)
          return powerOfLife.apply(this, args);
        } else {
          return powerOfLife;
        }
      };

      var params = [Species].concat(Array.prototype.slice.call(arguments))

      if (Species.ancestorSpecies && Species.ancestorSpecies.hasOwnProperty("bringToLife")) {
        grantHeritageAwareness.apply(this, params);
      }

      if (Species.prototype.hasOwnProperty("bringToLife")) {
        grantSelfAwareness.apply(this, params);
      }
    };

    Species = function Species() {
      God.breathLifeInto.apply(this, arguments);
    };

    if (blueprint && blueprint.ancestorSpecies) {
      ancestorSpecies = blueprint.ancestorSpecies;
    } else {
      ancestorSpecies = Object;
    }

    God.copyDNA({from: ancestorSpecies, to: Species});
    God.copyAttributes({from: blueprint, to: Species});
    God.grantFaithInGodTo(Species);

    return Species;
  };

  this.Species = Species
})()