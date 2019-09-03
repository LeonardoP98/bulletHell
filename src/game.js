import Player from "/src/player";
import InputHandler from "/src/input";
import Bullet from "/src/bullet";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class game {
  constructor(gameWidth, gameHeight) {
    this.gamestate = GAMESTATE.MENU;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.bullets = [];
    new InputHandler(this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.GAMEOVER
    )
      return;
    this.player = new Player(this);
    this.bullets = [];
    this.addBullet();
    this.gameObjects = [this.player];
    this.gamestate = GAMESTATE.RUNNING;
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bullets].forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Pause", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press spacebar to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    [...this.gameObjects, ...this.bullets].forEach(object =>
      object.update(deltaTime)
    );
    this.bullets = this.bullets.filter(bullet => bullet.exist);
  }

  gameover() {
    this.gamestate = GAMESTATE.GAMEOVER;
    clearInterval(this.bulletStorm);
  }

  addBullet() {
    this.bulletStorm = setInterval(() => {
      this.bullets.push(new Bullet(this));
    }, 100);
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
      this.addBullet();
    } else if (this.gamestate === GAMESTATE.RUNNING) {
      this.gamestate = GAMESTATE.PAUSED;
      clearInterval(this.bulletStorm);
    }
  }
}
