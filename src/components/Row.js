import React from 'react';

const Row = function(props) {
  return(
    <div className="row">
      {props.children}
    </div>
  )
};

export default Row;
