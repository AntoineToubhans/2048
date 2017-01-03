function IAManager(localStorageManager, keyboardInputManager, strategyManager) {
  this.localStorageManager = localStorageManager;
  this.keyboardInputManager = keyboardInputManager;
  this.strategyManager = strategyManager;

  this.numberOfGames = 0;

  this.best = {
    score: 0,
    bestBrick: 0,
  };

  this.total = {
    score: 0,
    bestBrick: 0,
  };

  this.current = {
    score: 0,
    bestBrick: 0,
  };

  this.listen();
}

IAManager.prototype.listen = function () {
  var self = this;

  var computeMean = function(field) {
    return self.numberOfGames == 0 ? 0 : Math.round(self.total[field] / self.numberOfGames);
  };

  self.localStorageManager.storage.clear();

  setInterval(function () {
    var gameState = self.localStorageManager.getGameState();

    if (gameState) {
      gameState.grid.cells.forEach(function (row) {
        row.forEach(function (cell) {
          if(cell) {
            self.current.bestBrick = Math.max(self.current.bestBrick, cell.value);
          }
        });
      });
      var move = self.strategyManager.predict(gameState.grid);

      if (gameState.won && !gameState.keepPlaying) {
        self.keyboardInputManager.emit("keepPlaying");
      }

      document.querySelector('.ai-best-brick-container').innerText = self.current.bestBrick;

      self.current.score = gameState.score;
      self.keyboardInputManager.emit("move", move);
    } else {
      self.numberOfGames += 1;

      self.best.score = Math.max(self.best.score, self.current.score);
      self.best.bestBrick = Math.max(self.best.bestBrick, self.current.bestBrick);

      self.total.score += self.current.score;
      self.total.bestBrick += self.current.bestBrick;

      self.current = {
        score: 0,
        bestBrick: 0,
      };

      document.querySelector('.ai-number-of-games-container').innerText = self.numberOfGames;
      document.querySelector('.ai-mean-score-container').innerText = computeMean("score");
      document.querySelector('.ai-mean-best-brick-container').innerText = computeMean("bestBrick");
      document.querySelector('.ai-best-best-brick-container').innerText = self.best.bestBrick;

      self.keyboardInputManager.emit("restart");
    }
  }, 10);
};
