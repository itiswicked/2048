import React from 'react';
import { connect } from 'react-redux';

import Cell from '../components/Cell';
import Row from '../components/Row';

const TwentyFourtyEight = function(props) {
  // debugger;
  const cells = props.board.map((row, rowIndex) => {
    let rowComps = row.map((number, cellIndex) => {
      return <Cell value={number}  key={cellIndex} />;
    });

    return(
      <Row key={rowIndex}>
        {rowComps}
      </ Row>
    )
  });

  return(
    <div className="game">
      <div className="board">
        {cells}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return { board: state.board.board };
}

export default connect(
  mapStateToProps,
  null
)(TwentyFourtyEight)
