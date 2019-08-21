import React from 'react';

const discardPile = (props) => {
  return(
    <div className="discardPile">
      <div className="discardPile__number">
        <span>{ props.count }</span>
      </div>
      <span>discard</span>
    </div>
  )
}

export default discardPile;
