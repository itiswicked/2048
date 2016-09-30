import { combineReducers } from 'redux';
import { flatten, shuffle, sample, sampleSize } from 'lodash';

let theBoard = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

function findEmptyNodes(board) {
  return flatten(board).reduce((emptyNodes, cell, index) => {
    if(cell === 0){
      return emptyNodes.concat([index]);
    } else {
      return emptyNodes;
    }
  }, []);
};

function coordinatesFromIndex(board, index) {
  let count = 0
  let coordinates;
  // debugger;
  board.forEach((row, yIndex) => {
    row.forEach((cell, xIndex) => {
      if(count === index) {
        coordinates = {x: xIndex, y: yIndex }
      }
      count += 1
    });
  });
  return coordinates;
};

function populateRandomTile(emptyNodes, board) {
  let options = [2, 4];
  let index = sample(shuffle(emptyNodes));
  let coord = coordinatesFromIndex(board, index);
  return board.map((row , yIndex) => {
    return row.map((cell, xIndex)  => {
      if (xIndex === coord.x && yIndex === coord.y) {
        return sample(options);
      } else {
        return cell;
      }
    });
  });
}

let emptyNodes = findEmptyNodes(theBoard);
let boardWithOneTile = populateRandomTile(emptyNodes, theBoard);
let boardWithTwoTiles = populateRandomTile(emptyNodes, boardWithOneTile);

let initialState = {
  board: boardWithTwoTiles
}
// debugger;

const board = function(state = initialState, action) {
  return state;
}
export default combineReducers({
  board
})
