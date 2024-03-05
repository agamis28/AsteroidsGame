class CollisionManager {
  getPositions(playerPosition, playerSize) {
    //Get positions of all other objects when implemented
    this.playerPosition = playerPosition;
    this.playerSize = playerSize;
    console.log(this.playerPosition.x);
  }
  wrapEdges(player) {
    if (this.playerPosition.x - this.playerSize > width) {
      player.changePosition(-this.playerSize, this.playerPosition.y);
    }
    if (this.playerPosition.x + this.playerSize < 0)
      player.changePosition(width + this.playerSize, this.playerPosition.y);
    if (this.playerPosition.y - this.playerSize > height) {
      player.changePosition(this.playerPosition.x, -this.playerSize);
    }
    if (this.playerPosition.y + this.playerSize < 0)
      player.changePosition(this.playerPosition.x, height + this.playerSize);
  }
}
