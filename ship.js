class Ship extends Actor {
  constructor(position, velocity, rotation, size, lives, maxBullets) {
    super(position);
    super(velocity);
    super(rotation);
    super(size);
    this.currentLives = lives;
    this.maxBullets = maxBullets;
    this.bullets = [];
    this.engine = false;
  }
}
