var Species = function(blueprint) {
  var Species, DNA, AncestorSpecies, God

  God = function God() { return Species };
  God.meaningOfLife = 42;
  God.speak = function() { return "I AM GOD" };

  God.grantFaithInGodTo = function(species) {
    species.prototype.constructor = God;
    species.constructor = God;
  };

  God.copyAttributesFromBluePrintTo = function(species){
    for (attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
          species.prototype[attribute] = blueprint[attribute];
      }
    }
  };

  God.addDNATo =  function(species) {
    if (blueprint && blueprint.ancestorSpecies) {
      AncestorSpecies = blueprint.ancestorSpecies;
    } else {
      AncestorSpecies = Object;
    }

    DNA = function DNA() {};
    DNA.prototype = AncestorSpecies.prototype;
    species.prototype = new DNA();
    species.ancestorSpecies = AncestorSpecies.prototype;
  };

  God.breathLifeInto = function() {
    var lifeForce, selfAwareness, selfAwareBeing, powerOfLife;

    var getIdentitiesFor = function(self, selfCount) {
      return Array.apply(null, new Array(selfCount)).map(Object.prototype.valueOf, self);
    };

    var grantHeritageAwareness = function() {
      lifeForce = Species.ancestorSpecies.bringToLife;
      selfAwareness = getIdentitiesFor(this, lifeForce.length);
      selfAwareBeing = [this].concat(selfAwareness);
      powerOfLife = lifeForce.apply(this, selfAwareBeing)
      if (typeof powerOfLife === 'function'){
        return powerOfLife.apply(this, arguments);
      } else {
        return powerOfLife;
      }
    };

    var grantSelfAwareness = function() {
      lifeForce = Species.prototype.bringToLife;
      selfAwareness = getIdentitiesFor(this, lifeForce.length);
      selfAwareBeing = [this].concat(selfAwareness);
      powerOfLife = lifeForce.apply(this, selfAwareBeing)
      if (typeof powerOfLife === 'function'){
        return powerOfLife.apply(this, arguments);
      } else {
        return powerOfLife;
      }
    };

    if (Species.ancestorSpecies && Species.ancestorSpecies.hasOwnProperty("bringToLife")) {
      grantHeritageAwareness.apply(this, arguments);
    }

    if (Species.prototype.hasOwnProperty("bringToLife")) {
      grantSelfAwareness.apply(this, arguments);
    }
  };

  God.constructor = God;
  God.prototype = God;

  Species = function Species() {
    God.breathLifeInto.apply(this, arguments);
  };

  God.addDNATo(Species);
  God.copyAttributesFromBluePrintTo(Species);
  God.grantFaithInGodTo(Species);

  return Species;
};