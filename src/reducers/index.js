import { combineReducers } from 'redux';

let initialState = {
  board: [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
  ]
}

const board = function(state = initialState, action) {
  return state;
}
export default combineReducers({
  board
})
