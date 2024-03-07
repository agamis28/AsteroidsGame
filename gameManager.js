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
  for (i = 0; i <= numberOfAsteroids; i++) {
    asteroids[i] = new Asteroid(
      createVector(random(0, width), random(0, height))
    );
    asteroids[i].setup();
  }
  // Creating a collision manager
  collisionManager = new CollisionManager();

  // Get all objects for collision manager
  //collisionManager.getObjects(ship, asteroids);
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
  for (i = 0; i <= numberOfAsteroids; i++) {
    asteroids[i].update();
    asteroids[i].display();
    collisionManager.wrapEdges(asteroids[i]);

    // Check collisions and if collision decrement health
    // TODO: break asteroids into two
    if (collisionManager.checkCollisions(ship, asteroids[i])) {
      ship.changePosition(width / 2, height / 2);
      ship.currentLives--;
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
    ship.rotation = 0;
  } else if (input.left) {
    ship.rotation = -ship.rotationSpeed;
  } else if (input.right) {
    ship.rotation = ship.rotationSpeed;
  } else {
    ship.rotation = 0;
  }
}
