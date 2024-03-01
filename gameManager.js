function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creating a user input
  input = new UserInput();
}
function draw() {
  // Input
  input.checkUserInput();
}
