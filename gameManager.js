function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship(createVector(width / 2, height / 2), 15, 3, 6);
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
}

function userInputUpdate() {
  if (input.up) {
    ship.engine = true;
  } else {
    ship.engine = false;
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
