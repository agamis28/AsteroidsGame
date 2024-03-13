function HUD() {
  this.font = loadFont("assets/Teko-Light.ttf");

  // Lives HUD
  this.shipSize = 10;
  this.sizeOffset = this.shipSize / 3;
  this.startPositionX = 600;
  this.positionY = 50;
  this.positionX = this.startPositionX;
  this.livesOffset = 30;

  this.displayScore = function (score) {
    textFont(this.font);
    text("Score: " + str(score), 50, 75);
  };

  this.displayLives = function (lives) {
    stroke("white");
    for (i = 0; i < lives; i++) {
      push();
      translate(this.positionX, this.positionY);
      triangle(
        -this.shipSize,
        this.shipSize,
        this.shipSize,
        this.shipSize,
        0,
        -this.shipSize - this.sizeOffset
      );
      this.positionX += this.livesOffset;
      pop();
    }
    this.positionX = this.startPositionX;
  };
}
