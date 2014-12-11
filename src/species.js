(function() {
  var God, DNA, Species;

  DNA = function DNA() {};

  God = function God() { };
  God.meaningOfLife = 42;
  God.speak = function() { return "I AM GOD" };
  God.prototype = God;
  God.prototype.constructor = God;

  God.grantFaithInGodTo = function(species) {
    species.prototype.constructor = God;
  };

  God.copyAttributes = function(attrSource, attrDestination){
    for (attribute in attrSource) {
      if (attrSource.hasOwnProperty(attribute)) {
        attrDestination.prototype[attribute] = attrSource[attribute];
      }
    }
  };

  God.applyDNA =  function(ancestorSpecies, childSpecies) {
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
        return powerOfLife.apply(this, Array.prototype.slice.call(arguments, 1));
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
        return powerOfLife.apply(this, Array.prototype.slice.call(arguments, 1));
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
    var Species = function Species() {
      God.breathLifeInto.apply(this, [Species].concat(Array.prototype.slice.call(arguments)));
    };
    var ancestorSpecies = (blueprint && blueprint.ancestorSpecies) ? blueprint.ancestorSpecies : Object
    God.applyDNA(ancestorSpecies, Species);
    God.copyAttributes(blueprint, Species);
    God.grantFaithInGodTo(Species);
    return Species;
  };

  this.Species = Species
})();
