const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';


const moveLeft = function() {
  return { type: MOVE_LEFT };
}

const moveRight = function() {
  return { type: MOVE_RIGHT };
}

const moveUp = function() {
  return { type: MOVE_UP };
}

const moveDown = function() {
  return { type: MOVE_DOWN };
}

export {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN,
  moveLeft,
  moveRight,
  moveUp,
  moveDown
};
