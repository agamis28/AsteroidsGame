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
    push();
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

    // Start Button

    // CLICK AREA
    // fill("white");
    // rectMode(CENTER);
    // rect(width / 2, height / 2 + 100, 110, 40);

    textSize(30);
    fill("white");
    text("Start Game", width / 2, height / 2 + 95);

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
    pop();
  };

  this.displayScore = function (score) {
    push();
    textSize(40);
    textFont(this.font);
    text("Score: " + str(score), 50, 70);
    pop();
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

  this.displayGameOverScreen = function (score) {
    push();
    // Setting text to center
    textAlign(CENTER, CENTER);
    // Setting font
    textFont(this.font);

    // Game Over
    textSize(100);
    stroke("#AC3535");
    fill("#AC3535");
    text("GAME OVER", width / 2, height / 2 - 200);

    // Score:
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("Score:", width / 2, height / 2 - 75);

    // Score Number
    textSize(50);
    stroke("white");
    fill("white");
    text(str(score), width / 2, height / 2);

    // CLICK AREA
    // fill("white");
    // rectMode(CENTER);
    // rect(width / 2, height / 2 + 150, 80, 40);

    // Restart Button
    textSize(30);
    stroke("black");
    fill("white");
    text("Restart", width / 2, height / 2 + 145);

    // CLICK AREA
    // fill("white");
    // rectMode(CENTER);
    // rect(width / 2, height / 2 + 230, 115, 40);

    // Highscores Button
    textSize(30);
    stroke("black");
    fill("white");
    text("Highscores", width / 2, height / 2 + 225);
    pop();
  };

  this.displayHighscoreScene = function () {
    push();
    // Setting text to center
    textAlign(CENTER, CENTER);
    // Setting font
    textFont(this.font);

    // Highscores
    textSize(100);
    stroke("white");
    fill("white");
    text("Highscores", width / 2, height / 2 - 300);

    // Number 1
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("1. Name: 2902974", width / 2, height / 2 - 140);

    // Number 2
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("2. JAHAH: 249298", width / 2, height / 2 - 70);

    // Number 3
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("3. dsdsa: 10274", width / 2, height / 2 - 0);

    // Number 4
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("4. Kdsde: 8524", width / 2, height / 2 + 70);

    // Number 5
    textSize(60);
    stroke("#175478");
    fill("#175478");
    text("5. Angel: 1222", width / 2, height / 2 + 140);

    // CLICK AREA
    // fill("white");
    // rectMode(CENTER);
    // rect(width / 2, height / 2 + 250, 100, 40);

    textSize(30);
    stroke("black");
    fill("white");
    text("Main Menu", width / 2, height / 2 + 245);
    pop();
  };
}
