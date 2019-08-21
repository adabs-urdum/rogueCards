import React from 'react';

const drawPile = (props) => {
  return(
    <div className="drawPile">
      <div className="drawPile__number">
        <span>{ props.count }</span>
      </div>
      <span>draw</span>
    </div>
  )
}

export default drawPile;
