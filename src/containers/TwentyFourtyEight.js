import React from 'react';
import { connect } from 'react-redux';
import hotkey from 'react-hotkey';

import Cell from '../components/Cell';
import Row from '../components/Row';


hotkey.activate();
class TwentyFourtyEight extends React.Component {
  constructor(props) {
    super(props)
    this.hotkeyHandler = this.handleHotkey.bind(this);
  }

  handleHotkey(e) {
    // debugger;
    let { moveLeft, moveRight, moveUp, moveDown } = this.props
    switch(e.key) {
      case 'ArrowLeft':
        moveLeft(); break;
      case 'ArrowRight':
        moveRight(); break;
      case 'ArrowUp':
        moveUp(); break;
      case 'ArrowDown':
        moveDown(); break;
      default:
        return;
    }
  }

  componentDidMount() {
    hotkey.addHandler(this.hotkeyHandler);
  }

  componentWillUnmount() {
    hotkey.removeHandler(this.hotkeyHandler);
  }

  render() {
    const cells = this.props.board.map((row, rowIndex) => {
      let rowComps = row.map((number, cellIndex) => {
        return <Cell value={number}  key={cellIndex} />;
      });
      return(
        <Row key={rowIndex} >
          {rowComps}
        </ Row>
      )
    });

    return(
      <div className="game" >
        <div className="board">
          {cells}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return { board: state.board.board };
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveLeft: () => {
      console.log("Left!")
    },

    moveRight: () => {
      console.log("Right!")
    },

    moveUp: () => {
      console.log("Up!")
    },
    moveDown: () => {
      console.log("Down!")
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwentyFourtyEight)
