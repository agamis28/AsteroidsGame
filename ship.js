class Ship extends Actor {
  constructor(position, velocity, rotation, size, lives, maxBullets) {
    this.position = position;
    super(velocity);
    super(rotation);
    super(size);
    this.currentLives = lives;
    this.maxBullets = maxBullets;
    this.bullets = [];
    this.engine = false;
    this.left = false;
    this.right = false;
  }

  display(){
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation.x, this.rotation.y);
    pop();
  }

  update(){
    console.log("position: "+position);
    console.log("engine is on: " + this.engine);
  }
}
