class Saucer {
  constructor(position, large, left, currentScore) {
    this.position = position;
    this.large = large;
    this.left = left;
    this.direction;
    this.velocity = createVector(0, 0);
    this.speed = 2;
    this.size;
    this.player;
    this.accuracyOffset = HALF_PI + QUARTER_PI;
    this.bulletAngle;
    this.bullets = [];
    this.accuracyPointIncrement = 200;
    this.score = currentScore;
    this.setup();
    this.pickRandomMoveDirection();
  }

  setup() {
    if (this.large) {
      this.size = 30;
      // Bad Accuracy, Larger Offset (Set in Constructor)
    } else {
      // Good accuracy based on score
      let scoreIncrementAmount = floor(
        this.score / this.accuracyPointIncrement
      );
      this.size = 15;
      this.accuracyOffset -= scoreIncrementAmount * (QUARTER_PI / 20);
      this.accuracyOffset = constrain(
        this.accuracyOffset,
        0,
        HALF_PI + QUARTER_PI
      );
    }

    // Binding con
    this.shoot = this.shoot.bind(this);
    this.pickRandomDirection = this.pickRandomMoveDirection.bind(this);

    this.shooting = setInterval(this.shoot, 2000);
    this.changingDirection = setInterval(this.pickRandomMoveDirection, 2000);
  }

  display() {
    push();
    ellipseMode(RADIUS);
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

  pickRandomMoveDirection() {
    this.direction = floor(random() * 3);
  }

  getPlayer(player) {
    this.player = player;
  }

  shoot() {
    console.log("accuracy : " + this.accuracyOffset);

    let directionOfPlayer = p5.Vector.sub(this.player.position, this.position);

    let playerAngle = Math.atan2(directionOfPlayer.y, directionOfPlayer.x);

    constrain(this.accuracyOffset, 0, TWO_PI);

    this.bulletAngle = random(
      playerAngle - this.accuracyOffset,
      playerAngle + this.accuracyOffset
    );

    this.bullets.push(new Bullet(this.position, this.bulletAngle, "#FE1517"));
  }
}
