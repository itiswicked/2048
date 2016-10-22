import { compose } from 'underscore';

import {
  collapse,
  fold,
  rotateCW,
  rotateCCW
} from './game.js'

export const boardTranslatedLeft = function(board) {
  return compose(
    collapse,
    fold,
    collapse
  )(board);
}

export const boardTranslatedRight = function(board) {
  return compose(
    rotateCW,
    rotateCW,
    collapse,
    fold,
    collapse,
    rotateCCW,
    rotateCCW
  )(board);
}

export const boardTranslatedUp = function(board) {
  return compose(
    rotateCW,
    collapse,
    fold,
    collapse,
    rotateCCW
  )(board);
}

export const boardTranslatedDown = function(board) {
  return compose(
    rotateCCW,
    collapse,
    fold,
    collapse,
    rotateCW
  )(board);
}
