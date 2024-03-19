let currentScene = 0;
let currentLevel = 1;
let currentScore = 0;

// Ship
let bullets = [];

// Asteroids
let startNumberOfAsteroids = 4;
let currentNumberOfAsteroids = startNumberOfAsteroids;
let asteroids = [];

// Saucers
let startNumberOfSaucers = 1;
let saucers = [];
let saucerBullets = [];

// Screen Shake
let isScreenShake = false;
let screenShakeDuration; // Set at screen shake start
let screenShakeIntensity; // Set at screen shake start

// Increment Lives after point threshold
let addLifePointThreshold = 10000;
let livesAdded = 0;
let cachedLivesAdded = livesAdded;

// Scenes: 0 Start Screen
// 1: Game Screen
// 2: Gameover Screen

function setup() {
  createCanvas(1000, 800);
  hud = new HUD();

  // Loading sounds
  gameMusic = createAudio("assets/arcadeMusic.mp3");
  shootSound = loadSound("assets/bulletSound.mp3");
  shootSound.setVolume(0.4);
  engineSound = loadSound("assets/engineSound.mp3");
  engineSound.setVolume(0.1);
  crashSound = loadSound("assets/crashSound.mp3");

  if (currentScene == 0) {
  } else if (currentScene == 1) {
    startGameScene();
  } else if (currentScene == 2) {
    startGameOverScene();
  }
}

function draw() {
  if (currentScene == 0) {
    drawStartMenu();
  } else if (currentScene == 1) {
    drawGameScene();
  } else if (currentScene == 2) {
    drawGameOverScene();
  }
}

function drawStartMenu() {
  // Background
  background("black");

  hud.displayStartScreen();
}

function startGameScene() {
  for (i = 0; i < asteroids.length; i++) {
    asteroids.splice(i, 1);
  }

  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship(createVector(width / 2, height / 2), 15, 5, 6);
  // Creating a asteroid
  for (i = 0; i < startNumberOfAsteroids; i++) {
    asteroids[i] = new Asteroid(
      createVector(random(0, width), random(0, height))
    );
  }

  // Saucers
  for (i = 0; i < startNumberOfSaucers; i++) {
    let saucerIsLarge = random() < 0.7; // 70% chance of being true
    let saucerIsGoingLeft = random() < 0.5; // 50% chance of being true

    if (saucerIsGoingLeft) {
      saucers[i] = new Saucer(
        createVector(width, random(0, height)),
        saucerIsLarge,
        saucerIsGoingLeft
      );
    } else {
      saucers[i] = new Saucer(
        createVector(0, random(0, height)),
        saucerIsLarge,
        saucerIsGoingLeft
      );
    }
  }

  // Creating a collision manager
  collisionManager = new CollisionManager();
}

function drawGameScene() {
  // Background
  background("black");

  // Loop Music
  gameMusic.loop();

  // Input
  //Sets up input key checks
  input.checkUserInput();
  //Calls associated bools or functions when a input is pressed
  userInputUpdate();

  // Screen Shake
  screenShake();

  // Check lifes and end game when lives is 0
  if (ship.currentLives <= 0) {
    // Go to game over screen
    currentScene++;
    // Reset Score
    currentScore = 0;
    // Reset number of asteroids
    currentNumberOfAsteroids = startNumberOfAsteroids;
  }

  // Asteroids
  if (asteroids.length == 0) {
    loadNewLevel();
  }
  for (i = 0; i <= asteroids.length - 1; i++) {
    if (asteroids[i] != undefined) {
      asteroids[i].update();
      asteroids[i].display();
      collisionManager.wrapEdges(asteroids[i]);

      // Check collisions with ship
      if (collisionManager.checkCollisions(ship, asteroids[i])) {
        // Ship on collisions
        ship.changePosition(width / 2, height / 2);
        ship.currentLives--;

        breakAsteroid();
        crashSound.play();
        startScreenShake();
      }
    }

    // Bullets
    for (j = 0; j < bullets.length; j++) {
      if (asteroids[i] != undefined && bullets[j] != undefined) {
        if (collisionManager.checkCollisions(asteroids[i], bullets[j])) {
          breakAsteroid();
          crashSound.play();
          startScreenShake();
          bullets.splice(j, 1);
          break;
        }
      }
    }
  }

  for (i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].display();
  }

  // Saucers
  for (i = 0; i <= saucers.length - 1; i++) {
    saucers[i].getPlayer(ship);
    saucers[i].display();
    saucers[i].update();
    collisionManager.wrapEdges(saucers[i]);

    console.log(saucers[i].bullets.length);
    for (j = 0; j < saucers[i].bullets.length; j++) {
      saucers[i].bullets[j].update();
      saucers[i].bullets[j].display();
    }
  }

  // Ship
  ship.update();
  ship.display();
  livesAdded = floor(currentScore / addLifePointThreshold);

  // Add life when there is a new life added
  if (
    livesAdded > cachedLivesAdded ||
    (livesAdded > cachedLivesAdded && cachedLivesAdded == 0)
  ) {
    ship.addLife();
    cachedLivesAdded++;
  }

  // Collision Manager / Wrap Edges
  collisionManager.wrapEdges(ship);

  // HUD
  hud.displayScore(currentScore);
  hud.displayLives(ship.currentLives);
}

function drawGameOverScene() {
  // Background
  background("black");

  // Stop game sounds
  stopAllSounds();

  hud.displayGameOverScreen();
}

function userInputUpdate() {
  if (input.up) {
    ship.engine = true;
    engineSound.loop();
  } else {
    ship.engine = false;
    engineSound.stop();
  }

  if (input.down) {
    ship.teleport();
  } else {
    // Once key is lifted return to can teleport
    ship.canTeleport = true;
  }

  // Rotation Inputs
  if (input.left && input.right) {
    ship.rotateShip(0);
  } else if (input.left) {
    ship.rotateShip(-1);
  } else if (input.right) {
    ship.rotateShip(1);
  } else {
    ship.rotateShip(0);
  }
}

function breakAsteroid() {
  // Asteroids on collision
  // Only break asteroids into two when lives aren't zero
  if (asteroids[i].lives > 1) {
    asteroids.push(new Asteroid(asteroids[i].position.copy()));
    asteroids.push(new Asteroid(asteroids[i].position.copy()));
    asteroids[asteroids.length - 1].lives = asteroids[i].lives - 1;
    asteroids[asteroids.length - 2].lives = asteroids[i].lives - 1;
    asteroids[asteroids.length - 1].setup();
    asteroids[asteroids.length - 2].setup();
  }
  // Add score to currentScore
  currentScore += asteroids[i].scoreValue;
  // Remove current asteroid
  asteroids.splice(i, 1);
}

function keyPressed() {
  // Shooting spawning bullet
  if (keyCode == 32) {
    shoot();
  }
}

function shoot() {
  if (bullets.length - 1 <= ship.maxBullets) {
  }
  shootSound.play();
  bullets.push(new Bullet(ship.position, ship.heading, "#E4BE4C"));
  ship.knockback();
}

function mouseClicked() {
  if (currentScene == 0) {
    mousePos = createVector(mouseX, mouseY - 20);
    startButtonPos = createVector(width / 2, height / 2 + 100);
    startButtonSizeX = 110;
    startButtonSizeY = 40;

    if (
      mouseX > startButtonPos.x - startButtonSizeX / 2 &&
      mouseX < startButtonPos.x + startButtonSizeX / 2 &&
      mousePos.y < startButtonPos.y + startButtonSizeY / 2 &&
      mousePos.y > startButtonPos.y - startButtonSizeY / 2
    ) {
      currentScene++;
      startGameScene();
    }
  }
  if (currentScene == 2) {
    mousePos = createVector(mouseX, mouseY - 20);
    startButtonPos = createVector(width / 2, height / 2 + 100);
    startButtonSizeX = 80;
    startButtonSizeY = 40;

    if (
      mouseX > startButtonPos.x - startButtonSizeX / 2 &&
      mouseX < startButtonPos.x + startButtonSizeX / 2 &&
      mousePos.y < startButtonPos.y + startButtonSizeY / 2 &&
      mousePos.y > startButtonPos.y - startButtonSizeY / 2
    ) {
      currentScene = 0;
    }
  }
}

function startScreenShake() {
  isScreenShake = true;
  screenShakeDuration = 5;
  screenShakeIntensity = 3;
}

function screenShake() {
  if (isScreenShake == true) {
    if (screenShakeDuration > 0) {
      let x = random(-screenShakeIntensity, screenShakeIntensity);
      let y = random(-screenShakeIntensity, screenShakeIntensity);
      translate(x, y);
      screenShakeDuration--;
    } else {
      isScreenShake = false;
    }
    translate(0, 0);
  }
}

function loadNewLevel() {
  currentNumberOfAsteroids++;
  for (i = 0; i <= currentNumberOfAsteroids; i++) {
    asteroids[i] = new Asteroid(
      createVector(random(0, width), random(0, height))
    );
  }
}

function stopAllSounds() {
  gameMusic.stop();
  shootSound.stop();
  engineSound.stop();
  crashSound.stop();
}
