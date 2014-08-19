var SentientBeing = function(blueprint) {

  var God = function() {

    var newBeing = {};

    for (var attribute in blueprint) {
      if (blueprint.hasOwnProperty(attribute)) {
        if (attribute == "bringToLife") {
          newBeing[attribute] = blueprint[attribute].bind(newBeing, newBeing, newBeing, newBeing);
        } else {
          newBeing[attribute] = blueprint[attribute];
        }
      }
    }

    if (newBeing.hasOwnProperty("bringToLife")) {
      newBeing.bringToLife();
    }

    return newBeing;
  };

  return God();
};
