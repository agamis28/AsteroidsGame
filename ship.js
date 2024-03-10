class Ship {
  constructor(startingPosition, size, lives, maxBullets) {
    this.position = startingPosition;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.rotation = 0;
    this.rotationSpeed = 0.05;
    this.heading = -HALF_PI; // Start facing upwards
    this.size = size;
    this.mass = 2;
    this.currentLives = lives;
    this.maxBullets = maxBullets;
    this.bullets = [];
    this.engine = false;
    this.canTeleport = true;
  }

  // Displaying ship to screen
  display() {
    // Setting an size offset for the tip of ship to be longer
    let sizeOffset = 5;

    // Setting colors of ship
    stroke("#175478");
    fill("#175478");

    // Drawing ship triangle at the correct translated location
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

  // Calling everyframe
  update() {
    // Adding rotation to heading
    this.heading += this.rotation;

    // Applying directional force when engine is on
    this.applyForce();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Friction
    this.velocity.mult(0.98);
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

  rotateShip(scalar) {
    this.rotation = this.rotationSpeed * scalar;
  }

  teleport() {
    if (this.canTeleport) {
      this.velocity = createVector(0, 0);
      this.position = createVector(random(0, width), random(0, height));
      // Check collisions
      // Die if spawned on another object
    }
    this.canTeleport = false;
  }

  changePosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
}
