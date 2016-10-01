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

function verticalSlice(board, index) {
  return board.map(row => row[index])
}

function rotateBoardCW(board) {
  return board.map((row, index) => verticalSlice(board, index).reverse());
}

function rotateBoardCCW(board) {
  return board
    .map(row => row.reverse())
    .map((row, index) => verticalSlice(board, index));
}

function collapseRow(row, index) {
  let filler = [0,0,0,0];
  let compactedRow = compact(row);
  return filler.map((zero, index) => {
    if(compactedRow[index]) {
      return compactedRow[index]
    } else {
      return zero;
    }
  })
}

// Moves non-zero values to the left
function collapse(board) {
  return board.map(collapseRow);
}

// merges adjacent, like numbers together
// called after collapse stage
function fold(board) {
  return board.map(row => {
    for(let i = 0; i < row.length; i++) {
      if(row[i] === row[i+1]) {
        row[i] *= 2
        row[i+1] = 0
      }
    }
    return row;
  })
}

function populateBoard(board) {
  let emptyNodes = findEmptyNodes(board);
  return populateRandomTile(emptyNodes, board)
}

function boardTranslatedLeft(board) {
  let newLeftBoard = compose(
      collapse,
      fold,
      collapse
  )(board);
  return populateBoard(newLeftBoard);
}

function boardTranslatedRight(board) {
  let newRightBoard = compose(
    rotateBoardCW,
    rotateBoardCW,
    collapse,
    fold,
    collapse,
    rotateBoardCCW,
    rotateBoardCCW
  )(board);
  return populateBoard(newRightBoard);
}

function boardTranslatedUp(board) {
  let newUpBoard = compose(
    rotateBoardCW,
    collapse,
    fold,
    collapse,
    rotateBoardCCW
  )(board);
  return populateBoard(newUpBoard)
}

function boardTranslatedDown(board) {
  let newDownBoard = compose(
    rotateBoardCCW,
    collapse,
    fold,
    collapse,
    rotateBoardCW
  )(board);
  return populateBoard(newDownBoard)
}

function boardWithTwoTiles(board) {
  let emptyNodes = findEmptyNodes(board);
  let boardWithOneTile = populateRandomTile(emptyNodes, board);
  emptyNodes = findEmptyNodes(boardWithOneTile);
  return populateRandomTile(emptyNodes, boardWithOneTile);
}

let initialState = {
  board: boardWithTwoTiles(theBoard)
}

const board = function(state = initialState, action) {
  let { board } = state;
  switch(action.type) {
    case MOVE_LEFT:
      return Object.assign({}, state, {
        board: boardTranslatedLeft(board)
      });
    case MOVE_RIGHT:
      return Object.assign({}, state, {
        board: boardTranslatedRight(board)
      });
    case MOVE_UP:
      // if userCanMoveUp(board)
          // do all this
      // else
        // return state
      return Object.assign({}, state, {
        board: boardTranslatedUp(board)
      });
    case MOVE_DOWN:
      return Object.assign({}, state, {
        board: boardTranslatedDown(board)
      });
    default:
      return state;
  }
}
export default combineReducers({
  board
})
