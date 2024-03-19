class Saucer {
  constructor(position, large, left) {
    this.position = position;
    this.large = large;
    this.left = left;
    this.direction;
    this.velocity = createVector(0, 0);
    this.speed = 2;
    this.size;
    this.accuracy;
    this.setup();
    this.pickRandomDirection();
  }

  setup() {
    if (this.large) {
      this.size = 55;
      // bad accuracy
    } else {
      this.size = 30;
      // accuracy is good and will tale players current velocity into account
    }

    // Binding con
    this.shoot = this.shoot.bind(this);
    this.pickRandomDirection = this.pickRandomDirection.bind(this);

    this.shooting = setInterval(this.shoot, 2000);
    this.changingDirection = setInterval(this.pickRandomDirection, 2000);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    fill("#AC3535");
    stroke("#AC3535");
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  update() {
    // Reset velocity
    this.velocity = createVector(0, 0);

    // Change X velocity based on if going left or not
    if (this.left) {
      this.velocity.x = -1;
    } else {
      this.velocity.x = 1;
    }

    // Change Y velocity based on randomly chosen direction
    switch (this.direction) {
      case 0:
        this.velocity.y = -0.5;
        break;
      case 1:
        this.velocity.y = 0;
        break;
      case 2:
        this.velocity.y = 0.5;
        break;
    }

    // Matching direction of velocity to speed
    this.velocity.mult(this.speed);
    // Moving position from velocity
    this.position.add(this.velocity);
  }

  pickRandomDirection() {
    this.direction = floor(random() * 3);
  }

  shoot() {
    console.log("saucer shoot");
  }
}
