function HUD() {
  this.font = loadFont("assets/Teko-Light.ttf");
  this.displayScore = function (score) {
    textFont(this.font);
    text("Score: " + str(score), 500, 75);
  };
}
