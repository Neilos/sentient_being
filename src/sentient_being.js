var SentientBeing = function(blueprint) {

  var getPronouns = function(pronoun, pronounCount) {
    return Array.apply(null, new Array(pronounCount)).map(Object.prototype.valueOf,pronoun);
  };

  var learnToLive = function(being, bringToLifeFunction) {
    var pronounCount = bringToLifeFunction.length;
    var thisPlusPronouns = [being].concat(getPronouns(being, pronounCount));
    being.bringToLife = bringToLifeFunction.bind.apply(bringToLifeFunction, thisPlusPronouns);
  };

  var God = function() {

    var newBeing = {};

    for (var attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
        if (attribute == "bringToLife") {
          learnToLive(newBeing, blueprint.bringToLife);
          newBeing.bringToLife();
        } else {
          newBeing[attribute] = blueprint[attribute];
        }
      }
    }

    return newBeing;
  };

  return God();
};
