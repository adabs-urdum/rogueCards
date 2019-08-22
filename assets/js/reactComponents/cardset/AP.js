import React from 'react';

const ap = (props) => {
  return(
    <div className="pile pile--ap">
      <div className="pile__number">
        <span>{ props.ap }/{ props.maxAp }</span>
      </div>
      <span className="pile__title">AP</span>
    </div>
  )
}

export default ap;
