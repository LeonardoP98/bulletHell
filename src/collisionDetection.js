export function detectCollision(main, gameObject) {
  let bottomOfMain = main.position.y + main.height;
  let topOfMain = main.position.y;
  let leftOfMain = main.position.x;
  let rightOfMain = main.position.x + main.width;

  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfMain >= topOfObject &&
    topOfMain <= bottomOfObject &&
    leftOfMain >= leftSideOfObject &&
    rightOfMain <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
