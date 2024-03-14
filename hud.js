function HUD() {
  // Font
  this.font = loadFont("assets/Teko-Light.ttf");

  // Lives HUD
  this.shipSize = 10;
  this.sizeOffset = this.shipSize / 3;
  this.startPositionX = 800;
  this.positionY = 50;
  this.positionX = this.startPositionX;
  this.livesOffset = 30;

  this.displayStartScreen = function () {
    // Setting text to center
    textAlign(CENTER, CENTER);
    // Setting font
    textFont(this.font);

    // ArchAngel
    textSize(50);
    stroke("#175478");
    fill("#175478");
    text("ArchAngel's", width / 2 - 50, height / 2 - 150);

    // Asteroids Title
    textSize(100);
    fill("white");
    text("ASTEROIDS", width / 2, height / 2 - 100);

    // Click to start
    // flashingColor = lerpColor(
    //   color(255, 255, 255),
    //   color(0, 0, 0),
    //   millis() % 2
    // );
    // textSize(35);
    // stroke(flashingColor);
    // fill(flashingColor);
    // text("Click To Start", width / 2, height / 2 + 200);
  };

  this.displayScore = function (score) {
    textSize(40);
    textFont(this.font);
    text("Score: " + str(score), 75, 50);
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
