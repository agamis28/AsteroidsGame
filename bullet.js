class Bullet {
  constructor(position, direction) {
    this.position = createVector(position.x, position.y);
    this.speed = 10;
    this.size = 5;
    this.velocityX = cos(direction) * this.speed;
    this.velocityY = sin(direction) * this.speed;
  }

  update() {
    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
  }

  display() {
    push();
    stroke("#E4BE4C");
    fill("#E4BE4C");
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
