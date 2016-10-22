import { combineReducers } from 'redux';
import { flatten, shuffle, sample, sampleSize, compact } from 'lodash';
import { compose } from 'underscore';

import { MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DOWN } from './../actions/board';

let theBoard = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

function findEmptyNodes(board) {
  return flatten(board).reduce((emptyNodes, cell, index) => {
    if(cell === 0) {
      return emptyNodes.concat([index]);
    } else {
      return emptyNodes;
    }
  }, []);
};

function coordinatesFromIndex(board, index) {
  let count = 0
  let coordinates;
  board.forEach((row, yIndex) => {
    row.forEach((cell, xIndex) => {
      if(count === index) {
        coordinates = { x: xIndex, y: yIndex }
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


function populateBoard(board) {
  let emptyNodes = findEmptyNodes(board);
  return populateRandomTile(emptyNodes, board)
}



function boardWithTwoTiles(board) {
  let emptyNodes = findEmptyNodes(board);
  let boardWithOneTile = populateRandomTile(emptyNodes, board);
  emptyNodes = findEmptyNodes(boardWithOneTile);
  return populateRandomTile(emptyNodes, boardWithOneTile);
}

function userCanMove(oldBoard, newBoard) {
  return !(flatten(oldBoard).join("") === flatten(newBoard).join(""));
}

let initialState = {
  board: boardWithTwoTiles(theBoard)
}
//
// let initialState = {
//   board: rightTest
// }
const board = function(state = initialState, action) {
  console.log("Reducer called!");
  switch(action.type) {
    case MOVE_LEFT:
      let newLeftBoard = boardTranslatedLeft(state.board)
      console.log("left!");
      if(true) {
        return Object.assign({}, state, {
          board: populateBoard(newLeftBoard)
        });
      } else {
        return state;
      }
    case MOVE_RIGHT:
    console.log("Board before translate: ");
    console.log(state.board);
      let newRightBoard = boardTranslatedRight(state.board)
      console.log("right!");
      console.log("board after translate:");
      console.log(newRightBoard);
      if(true) {
        return Object.assign({}, state, {
          board: populateBoard(newRightBoard)
        });
      } else {
        return state;
      }
    case MOVE_UP:
      let newUpBoard = boardTranslatedUp(state.board)
      console.log("up!");
      if(true) {
        return Object.assign({}, state, {
          board: populateBoard(newUpBoard)
        });
      } else {
        return state;
      }
    case MOVE_DOWN:
      let newDownBoard = boardTranslatedDown(state.board)
      console.log("down!");
      if(true) {
        return Object.assign({}, state, {
          board: populateBoard(newDownBoard)
        });
      } else {
        return state;
      }
    default:
      console.log("default!");
      return state;
  }
}
export default combineReducers({
  board
})
