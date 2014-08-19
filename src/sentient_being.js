var SentientBeing = function(blueprint) {

  var God = function() {

    var newBeing = {};

    for (var attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
        if (attribute == "bringToLife") {
          newBeing[attribute] = blueprint[attribute].bind(newBeing, newBeing, newBeing, newBeing, newBeing, newBeing, newBeing, newBeing, newBeing, newBeing, newBeing);
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
