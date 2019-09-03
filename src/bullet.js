import { detectCollision } from "/src/collisionDetection";

export default class Bullet {
  constructor(game) {
    this.game = game;
    this.width = 10;
    this.height = 10;
    this.position = {
      x: 0,
      y: 0
    };

    this.speed = {
      x: 0,
      y: 0
    };
    this.maxSpeed = 5;
    this.exist = true;
    this.startAttributes();
  }

  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltatime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //hit the player
    if (detectCollision(this, this.game.player)) {
      this.game.player.lives--;
      if (this.game.player.lives === 0) {
        this.game.gameover();
      }
      this.exist = false;
    }

    //hit the walls
    if (
      this.position.y + this.height > this.game.gameHeight ||
      this.position.y < 0 ||
      this.position.x + this.size > this.game.gameWidth ||
      this.position.x < 0
    ) {
      this.exist = false;
    }
  }

  startAttributes() {
    let n = Math.floor(Math.random() * 200);
    if (n % 2) {
      if (n % 4 === 1) {
        this.position.x = Math.floor(Math.random() * this.game.gameWidth) + 1;
        this.speed.y = this.maxSpeed;
      } else {
        this.position.x = Math.floor(Math.random() * this.game.gameWidth) + 1;
        this.speed.y = -this.maxSpeed;
        this.position.y = this.game.gameHeight - this.height;
      }
    } else {
      n = Math.floor(Math.random() * 200);
      if (n % 2 === 1) {
        this.position.y = Math.floor(Math.random() * this.game.gameHeight) + 1;
        this.speed.x = this.maxSpeed;
      } else {
        this.position.y = Math.floor(Math.random() * this.game.gameHeight) + 1;
        this.speed.x = -this.maxSpeed;
        this.position.x = this.game.gameWidth - this.width;
      }
    }
  }
}
