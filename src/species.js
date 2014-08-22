var Species = function(blueprint) {
  var Species, DNA, AncestorSpecies, God;

  Species = function Species() {
    if (Species.ancestorSpecies && Species.ancestorSpecies.hasOwnProperty("bringToLife")) {
      Species.ancestorSpecies.bringToLife.apply(this, arguments);
    }
    if (Species.prototype.hasOwnProperty("bringToLife")) {
      Species.prototype.bringToLife.apply(this, arguments);
    }
  };

  if (blueprint && blueprint.ancestorSpecies) {
    AncestorSpecies = blueprint.ancestorSpecies;
  } else {
    AncestorSpecies = Object;
  }

  God = function God(){ return Species; };
  God.constructor = God;
  God.prototype.constructor = God;
  God.givePowerOfLifeTo = function(species) {
    if (species.prototype.hasOwnProperty("bringToLife")) {
      var lifeforce = species.prototype.bringToLife;
      species.prototype.bringToLife = lifeforce.apply(species);
    }
  };

  DNA = function DNA() {};
  DNA.prototype = AncestorSpecies.prototype;
  Species.prototype = new DNA();
  Species.ancestorSpecies = AncestorSpecies.prototype;

  for (attribute in blueprint) {
    if (blueprint.hasOwnProperty(attribute)) {
        Species.prototype[attribute] = blueprint[attribute];
    }
  }

  Species.prototype.constructor = God;
  Species.constructor = God;

  God.givePowerOfLifeTo(Species);

  return Species;
};
