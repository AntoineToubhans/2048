function TotalDumbStrategy() {
}

TotalDumbStrategy.prototype.predict = function (grid) {
  return Math.floor((Math.random() * 4));
}

// ---------------------------------------------------------

function DumbStrategy() {
}

DumbStrategy.prototype.predict = function (grid) {
  if (Math.random() > 0.4) return 1;
  if (Math.random() > 0.4) return 2;
  if (Math.random() > 0.4) return 0;

  return 3;
}

// ---------------------------------------------------------

function LessDumbStrategy() {
}

LessDumbStrategy.prototype.canPlayRow = function (c1, c2, c3, c4) {
  return (c4 === null && c3 !== null)
    || (c3 === null && c2 !== null)
    || (c2 === null && c1 !== null)
    || (c1 && c2 && c1.value === c2.value)
    || (c2 && c3 && c2.value === c3.value)
    || (c3 && c4 && c3.value === c4.value) ;
}

LessDumbStrategy.prototype.canPlayRight = function (grid) {
  var self = this;
  return [0, 1, 2, 3].some(function (i) {
    return self.canPlayRow(grid.cells[0][i], grid.cells[1][i], grid.cells[2][i], grid.cells[3][i]);
  });
}

LessDumbStrategy.prototype.canPlayUp = function (grid) {
  var self = this;
  return [0, 1, 2, 3].some(function (i) {
    return self.canPlayRow(grid.cells[i][3], grid.cells[i][2], grid.cells[i][1], grid.cells[i][0]);
  });
}

LessDumbStrategy.prototype.canPlayDown = function (grid) {
  var self = this;
  return [0, 1, 2, 3].some(function (i) {
    return self.canPlayRow(grid.cells[i][0], grid.cells[i][1], grid.cells[i][2], grid.cells[i][3]);
  });
}

LessDumbStrategy.prototype.predict = function (grid) {
  if (this.canPlayRight(grid)) return 1;
  if (this.canPlayDown(grid)) return 2;
  if (this.canPlayUp(grid)) return 0;

  return 3;
}
