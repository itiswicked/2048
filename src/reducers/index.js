import { combineReducers } from 'redux';
import { flatten, shuffle, sample, sampleSize, compact } from 'lodash';
import { compose } from 'underscore';

import { MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DOWN } from './../actions/board';

function reverse(array) {
  let newArray = []
  for(let i = array.length - 1; i > -1; i--) {
    newArray.push(array[i])
  }
  return newArray;
}

// let rightTest = [
//   [0,0,0,2],
//   [0,0,0,2],
//   [0,0,0,2],
//   [0,0,0,2]
// ];

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
  let previousHasChanged = false
  return  board.map(row => {
    return row.map((cell, index) => {
      if(previousHasChanged) {
        previousHasChanged = false
        return 0;
      } else if(cell === row[index + 1]) {
        previousHasChanged = true
        return cell * 2;
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

function boardTranslatedLeft(board) {
  return compose(
    collapse,
    fold,
    collapse
  )(board);
}

function boardTranslatedRight(board) {
  return compose(
    rotateBoardCW,
    rotateBoardCW,
    collapse,
    fold,
    collapse,
    rotateBoardCCW,
    rotateBoardCCW
  )(board);
}

function boardTranslatedUp(board) {
  return compose(
    rotateBoardCW,
    collapse,
    fold,
    collapse,
    rotateBoardCCW
  )(board);
}

function boardTranslatedDown(board) {
  return compose(
    rotateBoardCCW,
    collapse,
    fold,
    collapse,
    rotateBoardCW
  )(board);
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
      // debugger;
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
