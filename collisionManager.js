class CollisionManager {
  constructor() {
    this.collisionPadding = 10;
  }

  wrapEdges(object) {
    // Going to right edge
    if (object.position.x - object.size > width) {
      // Change x to reset at left
      object.position = createVector(-object.size, object.position.y);
    }
    // Going to left edge
    if (object.position.x + object.size < 0) {
      // Change x to reset at right
      object.position = createVector(width + object.size, object.position.y);
    }
    // Going to bottom edge
    if (object.position.y - object.size > height) {
      // Change y to reset at top
      object.position = createVector(object.position.x, -object.size);
    }
    // Going to top edge
    if (object.position.y + object.size < 0) {
      // Change y to reset at bottom
      object.position = createVector(object.position.x, height + object.size);
    }
  }

  checkCollisions(object1, object2) {
    let distanceVec = p5.Vector.sub(object1.position, object2.position);
    let distanceMag = distanceVec.mag();
    if (distanceMag < object1.size + object2.size - this.collisionPadding) {
      return true;
    }
  }
}
