import { flatten, shuffle, sample, sampleSize, compact } from 'lodash';

function reverse(array) {
  let newArray = []
  for(let i = array.length - 1; i > -1; i--) {
    newArray.push(array[i])
  }
  return newArray;
}

function verticalSlice(board, index) {
  return board.map(row => row[index])
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

export const rotateCW = function(board) {
  return board.map((row, index) => reverse(verticalSlice(board, index)));
}

export const rotateCCW = function(board) {
  let newBoard = reverse(board)
    .map(reverse)
    .map((row, index) => verticalSlice(board, index));
  return reverse(newBoard);
}

export const fold = function(board) {
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

export const findEmptyNodes = function(board) {
  return flatten(board).reduce((emptyNodes, cell, index) => {
    if(cell === 0) {
      return emptyNodes.concat([index]);
    } else {
      return emptyNodes;
    }
  }, []);
};

export const collapse = function(board) {
  return board.map(collapseRow);
}

export const coordinatesFromIndex = function(board, index) {
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
