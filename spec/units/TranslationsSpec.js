import {
  boardTranslatedLeft,
  boardTranslatedRight,
  boardTranslatedUp,
  boardTranslatedDown
} from '../../src/translations';

import deepFreeze from 'deep-freeze';

describe('translations', () => {
  let boardBeforeLR = [
    [2,2,8,8],
    [0,8,8,2],
    [0,2,0,2],
    [0,0,4,4]
  ];
  deepFreeze(boardBeforeLR);


  describe('boardTranslatedLeft', () => {
    it('translates and combines like cells to the left', () => {
      let boardAfter = [
        [4,16,0,0],
        [16,2,0,0],
        [4,0,0,0],
        [8,0,0,0]
      ];
      expect(boardTranslatedLeft(boardBeforeLR)).toEqual(boardAfter);
    });
  });

  describe('boardTranslatedRight', () => {
    it('translates and combines like cells to the right', () => {
      let boardAfter = [
        [0,0,4,16],
        [0,0,16,2],
        [0,0,0,4],
        [0,0,0,8]
      ];
      expect(boardTranslatedRight(boardBeforeLR)).toEqual(boardAfter);
    });
  });
  //
  // describe('boardTranslatedUp', () => {
  //   it('does a thing', () => {
  //     expect(true).toEqual(false);
  //   });
  // });
  //
  // describe('boardTranslatedDown', () => {
  //   it('does a thing', () => {
  //     expect(true).toEqual(false);
  //   });
  // });
});
