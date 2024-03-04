class Ship {
  constructor(startingPosition, size, lives, maxBullets) {
    this.position = startingPosition;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.rotation = 0;
    this.rotationSpeed = 0.05;
    this.heading = 0;
    this.size = size;
    this.mass = 1;
    this.currentLives = lives;
    this.maxBullets = maxBullets;
    this.bullets = [];
    this.engine = false;
  }

  display() {
    let sizeOffset = 5;
    stroke("white");
    fill("black");
    push();
    translate(this.position.x, this.position.y);
    rotate((this.heading * PI) / 2);
    triangle(
      -this.size,
      this.size,
      this.size,
      this.size,
      0,
      -this.size - sizeOffset
    );
    pop();
  }

  update() {
    this.heading += this.rotation;
  }
}
