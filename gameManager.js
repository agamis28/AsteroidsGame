function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creating a user input
  input = new UserInput();
  // Creating a ship
  ship = new Ship();
}
function draw() {
  // Input
  input.checkUserInput();
  // Ship
  ship.update();
  ship.display();
}

function userInputUpdate(){
  if(input.up){
    ship.engine = true;
  }
  else{
    ship.engine = false;
  }
  if(input.left){
    ship.left = true;
  }
  else{
    ship.left = false;
  }
  if(input.right){
    ship.right = true;
  }
  else{
    ship.right = false;
  }
}
