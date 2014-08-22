var Species = function(blueprint) {
  var Species, DNA, AncestorSpecies, God;

  Species = function Species() {

    var ancestorLifeForce = function() {
      if (Species.ancestorSpecies && Species.ancestorSpecies.hasOwnProperty("bringToLife")) {
        var ancestorBringToLife = Species.ancestorSpecies.bringToLife.apply(this);
        return ancestorBringToLife.apply(this, arguments);
      }
    }

    var speciesLifeForce = function() {
      if (Species.prototype.hasOwnProperty("bringToLife")) {
        var speciesBringToLife = Species.prototype.bringToLife.apply(this); //need some pronouns as well
        return speciesBringToLife.apply(this, arguments);
      }
    }
    speciesLifeForce.apply(this, arguments);

    this.bringToLife = function() {
      ancestorLifeForce.apply(this, arguments);
      speciesLifeForce.apply(this, arguments);
    };

    this.bringToLife.apply(this, arguments);

  };

  if (blueprint && blueprint.ancestorSpecies) {
    AncestorSpecies = blueprint.ancestorSpecies;
  } else {
    AncestorSpecies = Object;
  }

  God = function God(){ return Species; };
  God.constructor = God;
  God.prototype = God;

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

  return Species;
};
