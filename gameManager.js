let numberOfAsteroids = 5;
let asteroids = [];
let currentScene = 0;
// Scenes: 0 Start Screen
// 1: Game Screen
// 2: Gameover Screen

function setup() {
  createCanvas(800, 800);
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
  startButton.position(width / 2 - startButton.width / 2, height / 2);
  startButton.mousePressed(() => {
    currentScene++;
    startButton.remove();
    startGameScene();
  });
}

function drawStartMenu() {
  // Background
  background("black");

  // Title Text
  fill("white");
  textFont("Helvetica");
  textSize(50);
  text("Asteroid's By Angel", width / 2 - 200, 80);
}

function startGameScene() {
  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship(createVector(width / 2, height / 2), 15, 3, 6);
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

  // Input
  //Sets up input key checks
  input.checkUserInput();
  //Calls associated bools or functions when a input is pressed
  userInputUpdate();

  // Asteroids
  for (i = 0; i <= asteroids.length - 1; i++) {
    asteroids[i].update();
    asteroids[i].display();
    collisionManager.wrapEdges(asteroids[i]);

    // Check collisions and if collision decrement health
    if (collisionManager.checkCollisions(ship, asteroids[i])) {
      // Ship
      ship.changePosition(width / 2, height / 2);
      ship.currentLives--;

      // Asteroids
      // Breakup asteroids

      let randomOffset = random(-5, 5);
      if (asteroids[i].lives > 0) {
        asteroids.push(
          new Asteroid(
            createVector(
              asteroids[i].position.x + randomOffset,
              asteroids[i].position.y + randomOffset
            )
          )
        );
        randomOffset = random(-5, 5);
        asteroids.push(
          new Asteroid(
            createVector(
              asteroids[i].position.x + randomOffset,
              asteroids[i].position.y + randomOffset
            )
          )
        );
        //asteroids.push(new Asteroid(asteroids[i].position));
        //asteroids.push(new Asteroid(asteroids[i].position));
        asteroids[asteroids.length - 1].lives = asteroids[i].lives - 1;
        asteroids[asteroids.length - 2].lives = asteroids[i].lives - 1;
        asteroids[asteroids.length - 1].setup();
        asteroids[asteroids.length - 2].setup();
      }

      asteroids.splice(i, 1);
      console.log("lives: " + ship.currentLives);
    }
  }

  // Ship
  ship.update();
  ship.display();

  // Collision Manager / Wrap Edges
  collisionManager.wrapEdges(ship);
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
