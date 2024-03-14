class Saucer {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.accuracy;
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    fill("#AC3535");
    stroke("#AC3535");
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
