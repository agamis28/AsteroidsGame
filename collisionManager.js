class CollisionManager {
  wrapEdges(object) {
    // Going to right edge
    if (object - object.size > width) {
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
    if (distanceMag < object1.size + object2.size) {
      return true;
    }
  }
}
// Checking for asteroids vs ship directly
// for (i = 0; i < this.asteroids.length; i++) {
//   // Asteroids and Ship collison
//   let distanceVec = p5.Vector.sub(
//     this.ship.position,
//     this.asteroids[i].position
//   );
//   let distanceMag = distanceVec.mag();
//   if (distanceMag < this.ship.size + this.asteroids[i].size) {
//     console.log("hit");
//   }
// }
//}
