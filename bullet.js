class Bullet {
  constructor(position, direction, color) {
    this.position = createVector(position.x, position.y);
    this.speed = 10;
    this.size = 5;
    this.velocityX = cos(direction) * this.speed;
    this.velocityY = sin(direction) * this.speed;
    this.color = color;
  }

  update() {
    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
  }

  display() {
    push();
    stroke(this.color);
    fill(this.color);
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
