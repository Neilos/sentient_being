var SentientBeing = function(blueprint) {

  var getPronouns = function(pronoun, pronounCount) {
    return Array.apply(null, new Array(pronounCount)).map(Object.prototype.valueOf,pronoun);
  };

  var learnToComeALive = function(being, bringToLifeFunction) {
    var pronounCount = bringToLifeFunction.length;
    var thisPlusPronouns = [being].concat(getPronouns(being, pronounCount));
    being.bringToLife = bringToLifeFunction.bind.apply(bringToLifeFunction, thisPlusPronouns);
  };

  var isArray = function(possibleArray) {
    return Object.prototype.toString.call(possibleArray) === '[object Array]';
  };


  var God = function() {

    var createFromBlueprint = function() {
      var newObject = {};
      for (var attribute in blueprint) {

        if (blueprint.hasOwnProperty(attribute)) {
          var attrDefinition = blueprint[attribute];

          if (attribute == "bringToLife") {
            learnToComeALive(newObject, attrDefinition);
            newObject.bringToLife();
          }
          else if (isArray(attrDefinition)) {
            newObject[attribute] = attrDefinition.concat();
          }
          else {
            newObject[attribute] = attrDefinition;
          }
        }
      }

      newObject.bringToLife = newObject.bringToLife || function() {};
      return newObject;
    };

    var newBeing = createFromBlueprint();
    return newBeing;
  };

  return God();
};
