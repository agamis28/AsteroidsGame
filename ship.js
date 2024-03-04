class Ship {
  constructor(startingPosition, size, lives, maxBullets) {
    this.position = startingPosition;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.rotation = 0;
    this.rotationSpeed = 0.1;
    this.heading = -HALF_PI; // Start facing upwards
    this.size = size;
    this.mass = 10;
    this.currentLives = lives;
    this.maxBullets = maxBullets;
    this.bullets = [];
    this.engine = false;
    this.canTeleport = true;
  }

  display() {
    let sizeOffset = 5;
    stroke("white");
    fill("black");
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + PI / 2);
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

    // Applying directional force when engine is on
    this.applyForce();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Friction
    this.velocity.mult(0.99);
    // Clearing acceleration to limit accleration
    this.acceleration.mult(0);
  }

  // Applying directional force when engine is on
  applyForce() {
    // Finding the force vector from the heading angle
    let force = p5.Vector.fromAngle(this.heading);
    // Finding accleration a = f/m
    force.div(this.mass);
    // Only when the engine is on add force to acceleration
    if (this.engine) {
      this.acceleration.add(force);
    }
  }

  teleport() {
    if (this.canTeleport) {
      this.velocity = createVector(0, 0);
      this.position = createVector(random(0, width), random(0, height));
    }
    this.canTeleport = false;
  }
}
