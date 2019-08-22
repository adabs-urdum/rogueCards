import React from 'react';

const discardPile = (props) => {
  return(
    <div className="pile pile--discard">
      <div className="pile__number">
        <span>{ props.count }</span>
      </div>
      <span className="pile__title">banish</span>
    </div>
  )
}

export default discardPile;
