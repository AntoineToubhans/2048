function DumbStrategy() {
}

DumbStrategy.prototype.predict = function (grid) {
  return Math.floor((Math.random() * 4));
}
