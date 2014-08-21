var SentientBeing = function(blueprint) {

  var NewBeing, DNA, Parent;

  NewBeing = function God() {}

  if (blueprint && blueprint.parent) {
    Parent = blueprint.parent;
  } else {
    Parent = Object;
  }

  DNA = function DNA() {};
  DNA.prototype = Parent.prototype;
  NewBeing.prototype = new DNA();
  NewBeing.parent = Parent.prototype;
  NewBeing.prototype.constructor = NewBeing;
  NewBeing.constructor = NewBeing;

  return NewBeing;
}

