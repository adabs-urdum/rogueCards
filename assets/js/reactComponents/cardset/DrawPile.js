import React from 'react';

const drawPile = (props) => {

  return(
    <div className="pile pile--draw">
      <div className="pile__number">
        <span>{ props.count }</span>
      </div>
      <span className="pile__title">draw</span>
    </div>
  )
}

export default drawPile;
