var SentientBeing = function(blueprint) {

  var SentientBeing, DNA, Parent, God;

  SentientBeing = function SentientBeing() {
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

  DNA = function DNA() {};
  DNA.prototype = Parent.prototype;
  SentientBeing.prototype = new DNA();
  SentientBeing.parent = Parent.prototype;
  SentientBeing.prototype.constructor = God;
  SentientBeing.constructor = God;

  for (attribute in blueprint) {
    if (blueprint.hasOwnProperty(attribute)) {
      if (attribute === "bringToLife") {
        SentientBeing.prototype[attribute] = blueprint[attribute].call();
      } else {
        SentientBeing.prototype[attribute] = blueprint[attribute];
      }
    }
  }

  return SentientBeing;
}


// var SentientBeing = function(Parent, props) {

//   var SentientBeing;
//   var DNA, i;

//   // 1.
//   // new constructor
//   SentientBeing = function() {
//     if (SentientBeing.parent && SentientBeing.parent.hasOwnProperty("__construct")) {
//       SentientBeing.parent.__construct.apply(this, arguments);
//     }
//     if (SentientBeing.prototype.hasOwnProperty("__construct")) {
//       SentientBeing.prototype.__construct.apply(this, arguments);
//     }
//   };

//   // 2.
//   // inherit
//   Parent = Parent || Object;
//   DNA = function() {};
//   DNA.prototype = Parent.prototype;
//   SentientBeing.prototype = new DNA();
//   SentientBeing.parent = Parent.prototype;
//   SentientBeing.prototype.constructor = SentientBeing;

//   // 3.
//   // add implementation methods
//   for (i in props) {
//     if (props.hasOwnProperty(i)) {
//       SentientBeing.prototype[i] = props[i];
//     }
//   }

//   return SentientBeing;
// };