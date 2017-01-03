// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  htmlActuator = new HTMLActuator();
  localStorageManager = new LocalStorageManager();
  keyboardInputManager = new KeyboardInputManager();

  game = new GameManager(4, keyboardInputManager, htmlActuator, localStorageManager);

  strategyManager = new LessDumbStrategy();
  iaManager = new IAManager(localStorageManager, keyboardInputManager, strategyManager);
});
