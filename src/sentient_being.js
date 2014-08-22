var SentientBeing = function(blueprint) {
  var SentientBeing, DNA, Parent, God;

  SentientBeing = function SentientBeing() {
    if (SentientBeing.parent && SentientBeing.parent.hasOwnProperty("bringToLife")) {
      SentientBeing.parent.bringToLife.apply(this, arguments);
    }
    if (SentientBeing.prototype.hasOwnProperty("bringToLife")) {
      SentientBeing.prototype.bringToLife.apply(this, arguments);
    }
  }

  if (blueprint && blueprint.parent) {
    Parent = blueprint.parent;
  } else {
    Parent = Object;
  }

  God = function God(){ return SentientBeing;}
  God.constructor = God;
  God.prototype.constructor = God;
  God.givePowerOfLifeTo = function(being) {
    if (being.prototype.hasOwnProperty("bringToLife")) {
      var lifeforce = being.prototype.bringToLife;
      being.prototype.bringToLife = lifeforce.apply();
    }
  };

  DNA = function DNA() {};
  DNA.prototype = Parent.prototype;
  SentientBeing.prototype = new DNA();
  SentientBeing.parent = Parent.prototype;

  for (attribute in blueprint) {
    if (blueprint.hasOwnProperty(attribute)) {
        SentientBeing.prototype[attribute] = blueprint[attribute];
    }
  }

  SentientBeing.prototype.constructor = God;
  SentientBeing.constructor = God;

  God.givePowerOfLifeTo(SentientBeing);

  return SentientBeing;
}
