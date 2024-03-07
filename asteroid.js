class Asteroid {
  constructor(position) {
    this.position = position;
    this.lives = 3;
    this.speed = 1;
    this.velocity = p5.Vector.random2D(); //createVector(0, 0);
    this.size = 55;
    this.vertexes = random(5, 13);
    this.change = [];
  }

  setup() {
    //console.log(this.velocity);
    // Check how many lives and set up correct change in asteroid size and speed
    if (this.lives == 3) {
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-25, 0);
      }
    } else if (this.lives == 2) {
      this.size = 40;
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-10, 0);
      }
      this.speed = 2.5;
    } else if (this.lives == 1) {
      this.size = 30;
      for (let i = 0; i <= this.vertexes; i++) {
        this.change[i] = random(-10, 0);
      }
      this.speed = 3.5;
    }

    // Setting correct velocity based on speed
    this.velocity.mult(this.speed);
  }

  display() {
    push();
    stroke("white");
    //fill("black");
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
}
