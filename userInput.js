class UserInput {
  constructor() {
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.space = true;
  }

  checkUserInput() {
    // Up Inputs
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.up = true;
    } else {
      this.up = false;
    }

    // Down Inputs
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.down = true;
    } else {
      this.down = false;
    }

    // Right Inputs
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.right = true;
    } else {
      this.right = false;
    }

    // Left Inputs
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.left = true;
    } else {
      this.left = false;
    }

    // Space Bar
    if (keyIsDown(32)) {
      this.space = true;
    } else {
      this.space = false;
    }
  }
}
