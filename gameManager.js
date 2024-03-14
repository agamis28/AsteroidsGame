let numberOfAsteroids = 4;
let asteroids = [];
let bullets = [];
let currentScene = 0;
let currentLevel = 1;
let currentScore = 0;
// Scenes: 0 Start Screen
// 1: Game Screen
// 2: Gameover Screen

function setup() {
  createCanvas(800, 800);
  hud = new HUD();
  gameMusic = createAudio("assets/arcadeMusic.mp3");
  gameMusic.volume(0.3);
  shootSound = createAudio("assets/bulletSound.mp3");
  if (currentScene == 0) {
    startStartMenu();
  } else if (currentScene == 1) {
    startGameScene();
  }
}
function draw() {
  if (currentScene == 0) {
    drawStartMenu();
  } else if (currentScene == 1) {
    drawGameScene();
  }
}

function startStartMenu() {
  // Start Button
  let startButton = createButton("Start Game");
  startButton.position(width / 2 - startButton.width / 2, height / 2 + 200);
  startButton.style("background-color", "black");
  startButton.style("border", "none");
  startButton.style("color", "white");
  startButton.style("font-family", hud.font);
  startButton.mousePressed(() => {
    currentScene++;
    startButton.remove();
    startGameScene();
  });
}

function drawStartMenu() {
  // Background
  background("black");

  hud.displayStartScreen();
}

function startGameScene() {
  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship(createVector(width / 2, height / 2), 15, 5, 6);
  // Creating a asteroid
  for (i = 0; i < numberOfAsteroids; i++) {
    asteroids[i] = new Asteroid(
      createVector(random(0, width), random(0, height))
    );
    asteroids[i].setup();
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

  // Asteroids
  console.log(asteroids.length);
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

        console.log("lives: " + ship.currentLives);
      }
    }

    // Bullets
    for (j = 0; j < bullets.length; j++) {
      if (asteroids[i] != undefined && bullets[j] != undefined) {
        if (collisionManager.checkCollisions(asteroids[i], bullets[j])) {
          breakAsteroid();
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

  // Ship
  ship.update();
  ship.display();

  // Collision Manager / Wrap Edges
  collisionManager.wrapEdges(ship);

  // HUD
  hud.displayScore(currentScore);
  hud.displayLives(ship.currentLives);
}

function userInputUpdate() {
  if (input.up) {
    ship.engine = true;
  } else {
    ship.engine = false;
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
    if (bullets.length - 1 <= ship.maxBullets) {
    }
    shootSound.play();
    bullets.push(new Bullet(ship.position, ship.heading));
  }
}

function loadNewLevel() {
  numberOfAsteroids++;
  for (i = 0; i <= numberOfAsteroids; i++) {
    asteroids[i] = new Asteroid(
      createVector(random(0, width), random(0, height))
    );
    asteroids[i].setup();
  }
}
