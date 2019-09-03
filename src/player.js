export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
    };
    this.speed = {
      x: 0,
      y: 0
    };
    this.maxSpeed = 6;
    this.lives = 3;
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.y < 0) {
      //top
      this.position.y = 0;
    }
    if (this.position.y + this.height > this.game.gameHeight) {
      //bottom
      this.position.y = this.game.gameHeight - this.height;
    }
    if (this.position.x < 0) {
      //left
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.game.gameWidth) {
      //right
      this.position.x = this.game.gameWidth - this.width;
    }
  }

  moveLeft() {
    this.speed.x = -this.maxSpeed;
  }
  moveRight() {
    this.speed.x = this.maxSpeed;
  }
  stopx() {
    this.speed.x = 0;
  }
  moveUp() {
    this.speed.y = -this.maxSpeed;
  }
  moveDown() {
    this.speed.y = this.maxSpeed;
  }
  stopy() {
    this.speed.y = 0;
  }
}
