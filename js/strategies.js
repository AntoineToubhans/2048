function DumbStrategy() {
}

DumbStrategy.prototype.predict = function (grid) {
  return Math.floor((Math.random() * 4));
}

function LessDumbStrategy() {
}

LessDumbStrategy.prototype.canPlayRight = function (grid) {
  return Math.random() > 0.4;
}

LessDumbStrategy.prototype.canPlayDown = function (grid) {
  return Math.random() > 0.5;
}

LessDumbStrategy.prototype.canPlayUp = function (grid) {
  return Math.random() > 0.6;
}

LessDumbStrategy.prototype.predict = function (grid) {
  if (this.canPlayRight(grid)) return 1;
  if (this.canPlayDown(grid)) return 2;
  if (this.canPlayUp(grid)) return 0;

  return 3;
}
