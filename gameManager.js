let currentScene = 0;
// 0: Start Scene
// 1: Game Scene
// 2: Game Over Scene
// 3: Highscore Scene
let currentLevel = 1;
let currentScore = 0;

// Highscores
let previousScore = 0;
let currentName = "";
let currentHighscores = [];
let canEnterName = true;

// Ship
let bullets = [];

// Asteroids
let startNumberOfAsteroids = 4; // 4
let currentNumberOfAsteroids = startNumberOfAsteroids;
let asteroids = [];

// Saucers
let startNumberOfSaucers = 0; // 0
let saucers = [];
// Add saucer after point threshold
let spawnSaucerThreshold = 1500; // 1500 playtest: 200
let saucersSpawned = 0;
let cachedSaucersSpawned = saucersSpawned;

// Screen Shake
let isScreenShake = false;
let screenShakeDuration; // Set at screen shake start
let screenShakeIntensity; // Set at screen shake start

// Increment Lives after point threshold
let addLifePointThreshold = 10000;
let livesAdded = 0;
let cachedLivesAdded = livesAdded;

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
  }

  // Loading back local storage to remember save scores to add to current highscores
  if (localStorage) {
    const savedScores = localStorage.getItem("highscores");
    if (savedScores) {
      currentHighscores = JSON.parse(savedScores);
    }
  } else {
    console.log("LOCAL STORAGE IS NOT SUPPORTED, HIGHSCORES WILL NOT WORK");
  }
}

function draw() {
  if (currentScene == 0) {
    drawStartMenu();
  } else if (currentScene == 1) {
    drawGameScene();
  } else if (currentScene == 2) {
    drawGameOverScene();
  } else if (currentScene == 3) {
    drawHighscoreScene();
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
    // For testing spawn in start number of saucers
    spawnSaucer();
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
    // Cache gameover score for saved scores
    previousScore = currentScore;
    // Reset Score
    currentScore = 0;
    // Reset number of asteroids
    currentNumberOfAsteroids = startNumberOfAsteroids;
    // Reset saucers and saucer bullets
    for (i = 0; i <= saucers.length - 1; i++) {
      saucers[i].bullets = [];
    }
    saucers = [];
    saucersSpawned = 0;
    cachedSaucersSpawned = 0;
    // Reset bullets
    bullets = [];
    // Reseting lives
    livesAdded = 0;
    cachedLivesAdded = 0;
    // Reset Name
    currentName = "";
    canEnterName = true;
  }

  // Asteroids
  if (asteroids.length == 0 && startNumberOfAsteroids != 0) {
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

    // Check collisions with saucers
    for (j = 0; j < saucers.length; j++) {
      if (asteroids[i] != undefined && saucers[j] != undefined) {
        if (collisionManager.checkCollisions(asteroids[i], saucers[j])) {
          breakAsteroid();
          crashSound.play();
          startScreenShake();
          saucers.splice(j, 1);
          break;
        }
      }

      // Check collisions with saucers bullets
      for (k = 0; k < saucers[j].bullets.length; k++) {
        if (
          collisionManager.checkCollisions(asteroids[i], saucers[j].bullets[k])
        ) {
          breakAsteroid();
          saucers[j].bullets.splice(k, 1);
          crashSound.play();
          startScreenShake();
          break;
        }
      }
    }

    // Check collisions with Bullets
    for (j = 0; j < bullets.length; j++) {
      if (asteroids[i] != undefined && bullets[j] != undefined) {
        if (collisionManager.checkCollisions(asteroids[i], bullets[j])) {
          breakAsteroid("ship bullet");
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
    saucers[i].update();
    saucers[i].display();
    collisionManager.wrapEdges(saucers[i]);
    // Check collisions with ship
    if (collisionManager.checkCollisions(ship, saucers[i])) {
      // Ship on collisions
      ship.changePosition(width / 2, height / 2);
      ship.currentLives--;

      saucers.splice(i, 1);
      crashSound.play();
      startScreenShake();
    }

    // Check collisions with Bullets
    for (j = 0; j < bullets.length; j++) {
      if (saucers[i] != undefined && bullets[j] != undefined) {
        if (collisionManager.checkCollisions(saucers[i], bullets[j])) {
          crashSound.play();
          startScreenShake();
          currentScore += saucers[i].scoreValue;
          bullets.splice(j, 1);
          saucers.splice(i, 1);
          break;
        }
      }
    }

    // Saucer Bullets
    if (saucers[i] && saucers[i].bullets) {
      for (j = 0; j < saucers[i].bullets.length; j++) {
        saucers[i].bullets[j].update();
        saucers[i].bullets[j].display();

        // Check collisions with ship
        if (collisionManager.checkCollisions(ship, saucers[i].bullets[j])) {
          // Ship on collisions
          ship.changePosition(width / 2, height / 2);
          ship.currentLives--;

          saucers[i].bullets.splice(j, 1);
          crashSound.play();
          startScreenShake();
        }
      }
    }
  }

  // Spawn saucer when hitting a threshold
  saucersSpawned = floor(currentScore / spawnSaucerThreshold);
  if (
    saucersSpawned > cachedSaucersSpawned ||
    (saucersSpawned > cachedSaucersSpawned && cachedSaucersSpawned == 0)
  ) {
    spawnSaucer();
    cachedSaucersSpawned++;
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

  hud.displayGameOverScreen(previousScore, currentName, canEnterName);
}

function drawHighscoreScene() {
  // Background
  background("black");

  // Debugging
  if (localStorage) {
    const savedScores = localStorage.getItem("highscores");
    console.log(savedScores);
  }

  hud.displayHighscoreScene();
}

function userInputUpdate() {
  if (currentScene == 1) {
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
}

function breakAsteroid(object) {
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

  // Only add to score when the ships bullet breaks asteroid
  if (object === "ship bullet") {
    // Add score to currentScore
    currentScore += asteroids[i].scoreValue;
  }

  // Remove current asteroid
  asteroids.splice(i, 1);
}

function keyPressed() {
  if (currentScene == 1) {
    // Shooting spawning bullet
    if (keyCode == 32) {
      shoot();
    }
  }
  if (currentScene == 2 && canEnterName) {
    if (
      ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) &&
      !keyIsDown(TAB) &&
      !keyIsDown(BACKSPACE) &&
      !keyIsDown(DELETE) &&
      !keyIsDown(ESCAPE) &&
      !keyIsDown(ALT)
    ) {
      if (keyCode != 20 && keyCode != SHIFT && keyCode != ENTER) {
        currentName += key;
      }
    }
    if (keyCode == ENTER) {
      // Stop allowing to type
      canEnterName = false;
      // Add typed in name to current highscores array
      currentHighscores.push(new ScoreObject(currentName, previousScore));

      // Organizing in decending order
      currentHighscores.sort((n, x) => x.score - n.score);

      // Set the current highscores to highscores in local storage
      if (localStorage) {
        localStorage.setItem("highscores", JSON.stringify(currentHighscores));
      }
    }
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
  mousePos = createVector(mouseX, mouseY - 20);

  if (currentScene == 0) {
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
    // Restart Button
    restartButtonPos = createVector(width / 2, height / 2 + 150);
    restartButtonSizeX = 80;
    restartButtonSizeY = 40;

    if (
      mouseX > restartButtonPos.x - restartButtonSizeX / 2 &&
      mouseX < restartButtonPos.x + restartButtonSizeX / 2 &&
      mousePos.y < restartButtonPos.y + restartButtonSizeY / 2 &&
      mousePos.y > restartButtonPos.y - restartButtonSizeY / 2
    ) {
      currentScene = 0;
    }

    // Highscores Button
    highscoresButtonPos = createVector(width / 2, height / 2 + 230);
    highscoresButtonSizeX = 115;
    highscoresButtonSizeY = 40;

    if (
      mouseX > highscoresButtonPos.x - highscoresButtonSizeX / 2 &&
      mouseX < highscoresButtonPos.x + highscoresButtonSizeX / 2 &&
      mousePos.y < highscoresButtonPos.y + highscoresButtonSizeY / 2 &&
      mousePos.y > highscoresButtonPos.y - highscoresButtonSizeY / 2
    ) {
      currentScene = 3;
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

function spawnSaucer() {
  let saucerIsLarge = random() < 0.7; // 70% chance of being true
  let saucerIsGoingLeft = random() < 0.5; // 50% chance of being true

  if (saucerIsGoingLeft) {
    saucers.push(
      new Saucer(
        createVector(width, random(0, height)),
        saucerIsLarge,
        saucerIsGoingLeft,
        currentScore
      )
    );
  } else {
    saucers.push(
      new Saucer(
        createVector(0, random(0, height)),
        saucerIsLarge,
        saucerIsGoingLeft,
        currentScore
      )
    );
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

// Score Object to store into local storage
function ScoreObject(name, score) {
  this.name = name;
  this.score = score;
}
