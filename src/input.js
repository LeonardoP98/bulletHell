export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      // alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
        case 65:
          game.player.moveLeft();
          break;
        case 39:
        case 68:
          game.player.moveRight();
          break;
        case 38:
        case 87:
          game.player.moveUp();
          break;
        case 40:
        case 83:
          game.player.moveDown();
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      // alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
        case 65:
          if (game.player.speed.x < 0) game.player.stopx();
          break;
        case 39:
        case 68:
          if (game.player.speed.x > 0) game.player.stopx();
          break;
        case 38:
        case 87:
          game.player.stopy();
          break;
        case 40:
        case 83:
          game.player.stopy();
          break;
        default:
      }
    });
  }
}
