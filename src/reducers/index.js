import { combineReducers } from 'redux';
import { flatten, shuffle, sample, sampleSize, compact } from 'lodash';
import { compose } from 'underscore';

import { MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DOWN } from './../actions/board';

let foldTest = [
  [2,2,2,8],
  [4,4,2,0],
  [0,8,0,8],
  [0,2,4,0]
]


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

let emptyNodes = findEmptyNodes(theBoard);
let boardWithOneTile = populateRandomTile(emptyNodes, theBoard);
emptyNodes = findEmptyNodes(boardWithOneTile);
let boardWithTwoTiles = populateRandomTile(emptyNodes, boardWithOneTile);
let initialState = {
  board: boardWithTwoTiles
}

const board = function(state = initialState, action) {
  switch(action.type) {
    case MOVE_LEFT:
      let newLeftBoard = compose(collapse, fold, collapse)(state.board);
      let emptyLeftNodes = findEmptyNodes(newLeftBoard);
      let populatedLeftBoard = populateRandomTile(emptyLeftNodes, newLeftBoard)
      return Object.assign({}, state, {
        board: populatedLeftBoard
      });
    case MOVE_RIGHT:
      let newRightBoard = compose(
        rotateBoardCW,
        rotateBoardCW,
        collapse,
        fold,
        collapse,
        rotateBoardCCW,
        rotateBoardCCW
      )(state.board);
      let emptyRightNodes = findEmptyNodes(newRightBoard);
      let populatedRightBoard = populateRandomTile(emptyRightNodes, newRightBoard)
      return Object.assign({}, state, {
        board: populatedRightBoard
      });
    case MOVE_UP:
      let newUpBoard = compose(
        rotateBoardCW,
        collapse,
        fold,
        collapse,
        rotateBoardCCW
      )(state.board);
      let emptyUpNodes = findEmptyNodes(newUpBoard);
      let populatedUpBoard = populateRandomTile(emptyUpNodes, newUpBoard)
      return Object.assign({}, state, {
        board: populatedUpBoard
      });
    case MOVE_DOWN:
      let newDownBoard = compose(
        rotateBoardCCW,
        collapse,
        fold,
        collapse,
        rotateBoardCW
      )(state.board);
      let emptyDownNodes = findEmptyNodes(newDownBoard);
      let populatedDownBoard = populateRandomTile(emptyNodes , newDownBoard)
      return Object.assign({}, state, {
        board: populatedDownBoard
      });
    default:
      return state;
  }
}
export default combineReducers({
  board
})
