import React from 'react';

const Cell = function(props) {
  return(
    <div className="cell">
      <h1>{props.value}</h1>
    </div>
  )
};

export default Cell;
