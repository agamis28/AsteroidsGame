let numberOfAsteroids = 5;
let asteroids = [];

function setup() {
  createCanvas(800, 800);
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
}
function draw() {
  // Background
  background("black");

  // Input
  //Sets up input key checks
  input.checkUserInput();
  //Calls associated bools or functions when a input is pressed
  userInputUpdate();

  // Ship
  ship.update();
  ship.display();

  // Asteroids
  for (i = 0; i <= numberOfAsteroids; i++) {
    asteroids[i].update();
    asteroids[i].display();
  }

  // Collision Manager / Wrap Edges
  collisionManager.getPositions(ship.position, ship.size);
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
