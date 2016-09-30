import React from 'react';

const colorMap = {
  0: "beige",
  2: "light-tan",
  4: "tan",
  8: "light-orange",
  16: "orange",
  32: "sunset",
  64: "deep-sunset",
  128: "yellow",
  256: "yellow",
  512: "yellow",
  1024: "yellow",
  2048: "yellow"
}

const Cell = function(props) {
  let classNames = "cell "
  classNames += colorMap[props.value];
  return(
    <div className={classNames}>
      <h1>{props.value}</h1>
    </div>
  )
};

export default Cell;
