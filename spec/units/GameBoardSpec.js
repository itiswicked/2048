import deepFreeze from 'deep-freeze';

import {
  collapse,
  coordinatesFromIndex,
  findEmptyNodes,
  fold,
  rotateCW,
  rotateCCW
} from '../../src/game'

describe("GameBoard", () => {
  let boardBefore = [
    [2,4,8,0],
    [0,8,4,2],
    [8,2,4,0],
    [4,2,0,8]
  ];
  deepFreeze(boardBefore);

  describe("rotateCW", () => {
    it("rotates the elements of the board clockwise by 90 degrees", () => {
      let boardAfter = [
        [4,8,0,2],
        [2,2,8,4],
        [0,4,4,8],
        [8,0,2,0]
      ];
      expect(rotateCW(boardBefore)).toEqual(boardAfter);
    });
  });

  describe("rotateCCW", () => {
    it("rotates the elements of the board counter-clockwise by 90 degrees", () => {
      let boardAfter = [
        [0,2,0,8],
        [8,4,4,0],
        [4,8,2,2],
        [2,0,8,4]
      ];
      expect(rotateCCW(boardBefore)).toEqual(boardAfter);
    });
  });

  describe("fold", () => {
    it("merges adjacent, like, non-zero values together towards the left", () => {
      let unfoldedBoard = [
        [0,2,2,2],
        [0,2,2,0],
        [256,256,2,0],
        [4,0,0,0]
      ];
      deepFreeze(unfoldedBoard)

      let foldedBoard = [
        [0,4,0,2],
        [0,4,0,0],
        [512,0,2,0],
        [4,0,0,0]
      ];
      expect(fold(unfoldedBoard)).toEqual(foldedBoard)
    });
  });

  describe("collapse", () => {
    it("pushes all non-zero values to the left", () => {
      let uncollapsedBoard = [
        [0,2,0,4],
        [4,0,0,0],
        [0,8,32,64],
        [0,0,0,2]
      ];
      deepFreeze(uncollapsedBoard)
      let collapsedBoard = [
        [2,4,0,0],
        [4,0,0,0],
        [8,32,64,0],
        [2,0,0,0]
      ]

      expect(collapse(uncollapsedBoard)).toEqual(collapsedBoard)
    });
  });

  describe("findEmptyNodes", () => {
    it("returns an array of available absolute index positions", () => {
      let nodes = [3,4,11,14];
      expect(findEmptyNodes(boardBefore)).toEqual(nodes);
    });
  });

  describe("coordinatesFromIndex", () => {
    it("gives the x and y coordinates from an absolute index", () => {
      let index = 11;
      let coordinates = { x: 3, y: 2 }
      expect(coordinatesFromIndex(boardBefore, index)).toEqual(coordinates);
    });
  });

  describe("populateRandomTile", () => {
    // stub lodash sample, shuffle
  })
});
