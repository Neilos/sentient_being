(function() {

  var grantKnowledgeOfCreatorTo = function(species) {
    species.prototype.constructor = God;
  };

  var copyAttributes = function(attrSource, attrDestination){
    for (attribute in attrSource) {
      if (attrSource.hasOwnProperty(attribute)) {
        attrDestination.prototype[attribute] = attrSource[attribute];
      }
    }
  };

  var applyDNA =  function(ancestorSpecies, childSpecies) {
    var DNA = function DNA() {};
    DNA.prototype = ancestorSpecies.prototype;
    childSpecies.prototype = new DNA();
    childSpecies.ancestorSpecies = ancestorSpecies.prototype;
  };

  var generateIdentitiesFor = function(self, identityCount) {
    return Array.apply(null, new Array(identityCount)).map(Object.prototype.valueOf, self);
  };

  var consciousness = function(speciesBio, attributes) {
    var numberOfIdentities = speciesBio.length
    var selfAwareness = generateIdentitiesFor(this, numberOfIdentities);
    var selfAwareBeing = [this].concat(selfAwareness);
    var powerOfLife = speciesBio.apply(this, selfAwareBeing);
    if (typeof powerOfLife === 'function'){
      powerOfLife.apply(this, attributes);
    } else {
      powerOfLife;
    }
  }

  var God = function God() { };
  God.meaningOfLife = 42;
  God.prototype = God;
  God.prototype.constructor = God;

  God.bringToLife = function(being, speciesType) {
    var attributes = Array.prototype.slice.call(arguments, 2)
    var being = being || new speciesType()

    if (speciesType.ancestorSpecies && speciesType.ancestorSpecies.hasOwnProperty("bio")) {
      var ancestorBio = speciesType.ancestorSpecies.bio || function(){}
      consciousness.call(being, ancestorBio, attributes);
    }

    if (speciesType.prototype.hasOwnProperty("bio")) {
      var speciesBio = speciesType.prototype.bio || function(){}
      consciousness.call(being, speciesBio, attributes);
    }

    return being;
  };

  God.createSpecies = function(blueprint, constructorFunction) {
    var species = constructorFunction || function Species() {
      God.bringToLife.apply(this, [this, Species].concat(Array.prototype.slice.call(arguments)));
    };
    var ancestorSpecies = (blueprint && blueprint.ancestorSpecies) ? blueprint.ancestorSpecies : Object
    applyDNA(ancestorSpecies, species);
    copyAttributes(blueprint, species);
    grantKnowledgeOfCreatorTo(species);
    return species
  }

  this.Species = function(blueprint) {
    return God.createSpecies(blueprint);
  };

})();
