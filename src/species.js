(function() {

  var God, DNA, Species;

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
    var object = whatToCopy.to
    for (attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
          object.prototype[attribute] = blueprint[attribute];
      }
    }
  };

  God.applyDNA =  function(ancestorSpecies, childSpecies) {
    DNA = function DNA() {};
    DNA.prototype = ancestorSpecies.prototype;
    childSpecies.prototype = new DNA();
    childSpecies.ancestorSpecies = ancestorSpecies.prototype;
  };

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

    var speciesType = arguments[0]
    var params = [speciesType].concat(Array.prototype.slice.call(arguments, 1))

    if (speciesType.ancestorSpecies && speciesType.ancestorSpecies.hasOwnProperty("bringToLife")) {
      grantHeritageAwareness.apply(this, params);
    }

    if (speciesType.prototype.hasOwnProperty("bringToLife")) {
      grantSelfAwareness.apply(this, params);
    }
  };

  Species = function(blueprint) {
    var Species, ancestorSpecies

    Species = function Species() {
      var params = [Species].concat(Array.prototype.slice.call(arguments))
      God.breathLifeInto.apply(this, params);
    };

    if (blueprint && blueprint.ancestorSpecies) {
      ancestorSpecies = blueprint.ancestorSpecies;
    } else {
      ancestorSpecies = Object;
    }

    God.applyDNA(ancestorSpecies, Species);
    God.copyAttributes({from: blueprint, to: Species});
    God.grantFaithInGodTo(Species);

    return Species;
  };

  this.Species = Species

})()