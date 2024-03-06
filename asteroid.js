class Asteroid {
  constructor(position) {
    this.position = position;
    this.lives = 3;
    this.speed = 1;
    this.velocity = createVector(0, 0);
    this.size = 55;
    this.angleDelta = 0.5;
    this.vertexes = random(5, 13);
    this.change = [];
  }

  setup() {
    // Check how many lives and set up correct change in asteroid size and speed
    if (this.lives == 3) {
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-30, 0);
      }
    } else if (this.lives == 2) {
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-40, 0);
      }
      this.speed = 3;
    } else if (this.lives == 1) {
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-40, 0);
      }
      this.speed = 5;
    }

    // Change velocity with correct speed
    let velocityAngle = random(0, TWO_PI);
    let x = this.speed * cos(velocityAngle);
    let y = this.speed * sin(velocityAngle);
    this.velocity = createVector(x, y);
  }

  display() {
    push();
    stroke("white");
    fill("black");
    beginShape();
    for (let i = 0; i <= this.vertexes; i++) {
      let angle = map(i, 0, this.vertexes, 0, TWO_PI);
      let size = this.size + this.change[i];
      let x = size * cos(angle);
      let y = size * sin(angle);
      vertex(this.position.x + x, this.position.y + y);
    }
    endShape(CLOSE);
    pop();
  }

  update() {
    // Add a constant velocity to position
    this.position.add(this.velocity);
  }

  setSize(size) {
    this.size = size;
  }
}
