import React from 'react';

const banishPile = (props) => {
  return(
    <div className="pile pile--banish">
      <div className="pile__number">
        <span>{ props.count }</span>
      </div>
      <span className="pile__title">banish</span>
    </div>
  )
}

export default banishPile;
