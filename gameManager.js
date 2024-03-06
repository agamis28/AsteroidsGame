function setup() {
  createCanvas(800, 800);
  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship(createVector(width / 2, height / 2), 15, 3, 6);
  // Creating a asteroid
  asteroid = new Asteroid(createVector(300, 200));
  asteroid.setup();
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

  // Asteroid
  asteroid.update();
  asteroid.display();

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
